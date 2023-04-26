import { LoadController } from "../../../presentational/controllers/load";
import { LoadCardUsecaseFactory } from "../usecases/loadCard";

export function LoadCardControllerFactory() {
  return new LoadController(LoadCardUsecaseFactory());
}
