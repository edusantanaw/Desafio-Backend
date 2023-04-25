import { Router } from "express";
import { adapter } from "../adapter/express";
import { authControllerFactory } from "../factory/controller/auth";

export default (router: Router) => {
  router.post("/login", adapter(authControllerFactory()));
};
