import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUserDto } from '../../domain';
import { JwtAdapter } from '../../config/jwt.adapter';
import { UserModel } from '../../data/mongodb';


export class AuthController {

  //Inyeccion de dependencias
  constructor(
    private readonly authRepository: AuthRepository
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authRepository.register(registerUserDto!)
      .then(user => {
        res.json({
          user,
          token: JwtAdapter.generateToken({ id: user.id })
        })
      })
      .catch(error => this.handleError(error, res));
  }

  loginUser = (req: Request, res: Response) => {
    //Lógica para autenticar un usuario
    res.json('loginUser controller');
  }

  getUsers = (req: Request, res: Response) => {

    UserModel.find()
      .then(users => {
        res.json({
          user: req.body.user
        })
      })
      .catch(() => res.status(500).json({ error: 'Internal server error' }));
  }

}