import { Validators } from "../../../config";

export class RegisterUserDto {

  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}

  static create(object: {[key: string]: any}):[string?, RegisterUserDto?] {

    const { name, email, password } = object;

    if( !name ) return ['Missing name'];
    if( !Validators.userName.test(name) ) return ['Name is not valid'];
    if( !email ) return ['Missing email'];
    if( !Validators.userEmail.test(email) ) return ['Email is not valid'];
    if( !password ) return ['Missing password'];
    if( !Validators.userPassword.test(password) ) return ['Password is not valid'];

    return[
      undefined,
      new RegisterUserDto(
        name,
        email.toLowerCase(),
        password,
      )
    ];
  }
}