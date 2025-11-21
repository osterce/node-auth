import { UserEntity } from "../entities/user.entity";

import { LoginUserDto, RegisterUserDto } from "..";


//abstract porque no se va a instanciar fuera de la clase, solo sirve para definir reglas
export abstract class AuthRepository {

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

}