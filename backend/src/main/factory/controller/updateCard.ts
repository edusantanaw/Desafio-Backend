import { UpdateCardController } from "../../../presentational/controllers/updateCard";
import { SchemaValidator } from "../../../presentational/helpers/schemaValidator";
import { updateCard } from "../../../presentational/validation/schemas/card";
import { UpdateCardUsecaseFactory } from "../usecases/updateCard";

export function UpdateCardControllerFactory() {
  const updateCardUsecase = UpdateCardUsecaseFactory();
  const schemaValidator = new SchemaValidator(updateCard);
  return new UpdateCardController(schemaValidator, updateCardUsecase);
}
