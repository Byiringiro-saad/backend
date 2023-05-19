import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

//interfaces
import Controller from "./interfaces/controller.interface";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    dotenv.config();
    this.app = express();

    //initializing
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen = () => {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  };

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(`/${controller.path}`, controller.router);
    });
  }

  private connectToTheDatabase() {
    mongoose.connect(`${process.env.MONGO_URI}`, {});
  }
}

export default App;
