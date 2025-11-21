import { JwtAdapter } from "../../../config/jwt.adapter";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    roles: string[];
  }
}

type SignToken = (payload: Object, duration?: number) => string;

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

export class LoginUser implements LoginUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) { }

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);
    const token = this.signToken({ id: user.id }, 60 * 60 * 4);
    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      }
    }

  }
}