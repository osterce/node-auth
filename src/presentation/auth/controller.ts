import { Request, Response } from 'express';

export class AuthController {

  //Inyeccion de dependencias
  constructor() {}

  registerUser = ( req: Request, res: Response) => {
    //Lógica para registrar un usuario
    res.json('registerUser controller');
  }

  loginUser = ( req: Request, res: Response) => {
    //Lógica para autenticar un usuario
    res.json('loginUser controller');
  }

}