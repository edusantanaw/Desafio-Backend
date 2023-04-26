import { Router } from "express";
import verifyAuth from "../middlewares/verify-auth";
import { LoadCardControllerFactory } from "../factory/controller/loadCard";
import { adapter } from "../adapter/express";
import { CreateCardControllerFactory } from "../factory/controller/createCard";
import { UpdateCardControllerFactory } from "../factory/controller/updateCard";
import { updateLoggerMiddleware } from "../middlewares/logger";

export default (router: Router) => {
  router.get("/card", verifyAuth, adapter(LoadCardControllerFactory()));
  router.post("/card", verifyAuth, adapter(CreateCardControllerFactory()));
  router.put(
    "/card/:id",
    verifyAuth,
    updateLoggerMiddleware,
    adapter(UpdateCardControllerFactory())
  );
};
