import { LoginUserDto, RegisterUserDto } from "..";
import { UserEntity } from "../entities/user.entity";



//abstract porque no se va a instanciar fuera de la clase, solo sirve para definir reglas
export abstract class AuthDataSource {

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

}