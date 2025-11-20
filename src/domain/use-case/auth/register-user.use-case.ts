import { JwtAdapter } from "../../../config/jwt.adapter";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
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

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

export class RegisterUser implements RegisterUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) { }

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this.authRepository.register(registerUserDto);
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