import { Router } from "express";
import verifyAuth from "../middlewares/verify-auth";
import { LoadCardControllerFactory } from "../factory/controller/loadCard";
import { adapter } from "../adapter/express";
import { CreateCardControllerFactory } from "../factory/controller/createCard";
import { UpdateCardControllerFactory } from "../factory/controller/updateCard";
import {
  removeLoggerMiddleware,
  updateLoggerMiddleware,
} from "../middlewares/logger";
import removeXss from "../middlewares/removeXss";
import { DeleteCardControllerFactory } from "../factory/controller/deleteCard";

export default (router: Router) => {
  router.get("/card", verifyAuth, adapter(LoadCardControllerFactory()));
  router.post(
    "/card",
    verifyAuth,
    removeXss,
    adapter(CreateCardControllerFactory())
  );
  router.put(
    "/card/:id",
    verifyAuth,
    removeXss,
    updateLoggerMiddleware,
    adapter(UpdateCardControllerFactory())
  );
  router.delete(
    "/card/:id",
    verifyAuth,
    removeLoggerMiddleware,
    adapter(DeleteCardControllerFactory())
  );
};
