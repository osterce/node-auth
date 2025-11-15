import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class MongoDataSourcesImpl implements AuthDataSource {

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
        password: BcryptAdapter.hash(password)
      });

      await user.save();

      //3. Mapear el DTO a una entidad
      //Todo: falta un mapper
      return new UserEntity(
        user._id.toString(),
        name,
        email,
        user.password,
        user.role
      )

    } catch (error) {

      if(error instanceof CustomError){
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }

}