import { AuthController } from "../../../presentational/controllers/auth";
import { authUsecaseFactory } from "../usecases/auth";

export function authControllerFactory() {
  return new AuthController(authUsecaseFactory());
}
