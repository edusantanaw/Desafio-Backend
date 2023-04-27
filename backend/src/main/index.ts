import express from "express";
import * as dotenv from "dotenv";
import routes from "./config/routes";
import database from "./config/db";
import cors from "cors";

const CLIENT_ORIGIN = ["http://localhost:3000"];

class Server {
  private app = express();
  private port = 5000;

  private middlewares() {
    this.app.use(cors({ credentials: true, origin: CLIENT_ORIGIN }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private start() {
    dotenv.config();
    const cb = () => console.log(`Server running at port: ${this.port}`);
    this.app.listen(this.port, cb);
  }

  public async bootstrap() {
    this.middlewares();
    database.sync({ force: true });
    routes(this.app);
    this.start();
  }
}

const server = new Server();
server.bootstrap();
