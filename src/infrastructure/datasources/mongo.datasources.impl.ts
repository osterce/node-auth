import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class MongoDataSourcesImpl implements AuthDataSource {

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { email, name, password } = registerUserDto;

    try {

      //1. Verificar si el usuario ya existe
      //2. Si no existe, hashear la contraseña
      //3. Mapear el DTO a una entidad

      return new UserEntity(
        '1',
        name,
        email,
        password,
        ['ADMIN_ROLE']
      )

    } catch (error) {

      if(error instanceof CustomError){
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }

}