import { Router } from "express";
import verifyAuth from "../middlewares/verify-auth";
import { LoadCardControllerFactory } from "../factory/controller/loadCard";
import { adapter } from "../adapter/express";

export default (router: Router) => {
  router.get("/card", verifyAuth, adapter(LoadCardControllerFactory()));
};
