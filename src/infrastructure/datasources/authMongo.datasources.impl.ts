import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashPassword = (password: string) => string;
type ComparePassword = (password: string, hashedPassword: string) => boolean;

export class MongoDataSourcesImpl implements AuthDataSource {

  constructor(
    private readonly hashPassword: HashPassword = BcryptAdapter.hash,
    private readonly comparePassword: ComparePassword = BcryptAdapter.compare
  ) { }
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.badRequest('User not found');

      const isMatchingPassword = this.comparePassword(password, user.password);
      if (!isMatchingPassword) throw CustomError.badRequest('Invalid credentials');

      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { email, name, password } = registerUserDto;

    try {

      //1. Verificar si el email ya existe
      const existsUser = await UserModel.findOne({ email });
      if (existsUser) throw CustomError.badRequest('Email already exists');

      //2. Si no existe, hashear la contraseña
      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password)
      });

      await user.save();

      //3. Mapear el DTO a una entidad
      //Todo: falta un mapper
      return UserMapper.userEntityFromObject(user);

    } catch (error) {

      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }

}