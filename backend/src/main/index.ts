import express from "express";
import * as dotenv from "dotenv";
import routes from "./config/routes";

class Server {
  private app = express();
  private port = 5000;

  private middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private start() {
    dotenv.config();
    const cb = () => console.log(`Server running at port: ${this.port}`);
    this.app.listen(this.port, cb);
  }

  public bootstrap() {
    this.middlewares();
    routes(this.app);
    this.start();
  }
}

const server = new Server();
server.bootstrap();
