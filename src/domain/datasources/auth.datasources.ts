import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

//abstract porque no se va a instanciar fuera de la clase, solo sirve para definir reglas
export abstract class AuthDataSource {

  //todo:
  //abstract login();
  abstract register( registerUserDto: RegisterUserDto):Promise<UserEntity>

}
