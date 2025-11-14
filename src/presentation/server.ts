import express, { Router } from 'express';

interface Options{
  port?: number;
  routes: Router;
}

export class Server {

  //Propiedades públicas e inmutables -> public readonly
  public readonly app = express();
  //Popiedades privadas e inmutables -> private readonly
  private readonly port: number;
  private readonly routes: Router;

  constructor( options: Options) {
    const { port = 3000, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start(){

    //Usar las rutas definidas
    this.app.use( this.routes );

    //Iniciar el servidor - escuchar en el puerto definido
    this.app.listen( this.port, () => {
      console.log(`Server running on http://localhost:${ this.port }`);
    });

  }
}