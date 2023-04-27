import { DeleteController } from "../../../presentational/controllers/delete";
import { DeleteCardUsecaseFactory } from "../usecases/deleteCard";
import { LoadCardUsecaseFactory } from "../usecases/loadCard";

export function DeleteCardControllerFactory() {
  const deleteCardUsecase = DeleteCardUsecaseFactory();
  const loadCardUsecase = LoadCardUsecaseFactory();
  return new DeleteController(deleteCardUsecase, loadCardUsecase);
}
