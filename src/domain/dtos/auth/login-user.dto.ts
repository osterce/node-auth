import { Validators } from "../../../config";

export class LoginUserDto {

  constructor(
    public email: string,
    public password: string
  ) { }

  static loginUserDto(object: { [key: string]: any }): [string?, LoginUserDto?] {

    const { email, password } = object;

    if (!email) return ['Missing email'];
    if (!Validators.userEmail.test(email)) return ['Invalid email'];
    if (!password) return ['Missing password'];
    if (!Validators.userPassword.test(password)) return ['Invalid password'];

    return [
      undefined,
      new LoginUserDto(
        email.toLowerCase(),
        password,
      )
    ];
  }

}