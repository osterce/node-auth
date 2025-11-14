import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain';

export class AuthController {

  //Inyeccion de dependencias
  constructor() {}

  registerUser = ( req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create( req.body );
    if( error ) return res.status(400).json({ error });
    res.json( registerUserDto );
  }

  loginUser = ( req: Request, res: Response) => {
    //Lógica para autenticar un usuario
    res.json('loginUser controller');
  }

}