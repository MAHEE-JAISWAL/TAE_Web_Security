import express from 'express';
import { NODE_ENV,PORT } from '@config';
import { Routes } from '@interface/routes.interface';
import { AppDataSource } from '@database';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 5000;

    this.app.use(express.json());
    this.connectToDatabase();
    this.initializeRoutes(routes);

    // this.initializeMiddlewares();
    // this.initializeErrorHandling();
    // this.initializeSwagger();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`========================================`);
      console.log(`======= Environment: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`========================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase = async () => {
    try {
      await AppDataSource.initialize();
      console.log("Database connection established successfully.");
      console.log("============================================");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  };

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }
}