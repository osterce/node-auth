import { Router } from "express";
import { AuthController } from "./controller";
import { MongoDataSourcesImpl, MongoRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {

  static get routes(): Router {

    const router = Router();

    const mongoDatasource = new MongoDataSourcesImpl();
    const authRepository = new MongoRepositoryImpl( mongoDatasource );
    const controller = new AuthController( authRepository );

    router.use('/login', controller.loginUser );
    router.use('/register', controller.registerUser ) ;

    return router;
  }

}