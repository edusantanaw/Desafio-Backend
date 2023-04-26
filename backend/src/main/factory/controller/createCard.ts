import { CreateCardController } from "../../../presentational/controllers/create";
import { SchemaValidator } from "../../../presentational/helpers/schemaValidator";
import { createCard } from "../../../presentational/validation/schemas/card";
import { CreateCardUsecaseFactory } from "../usecases/createCard";

export function CreateCardControllerFactory() {
  const createCardUsecase = CreateCardUsecaseFactory();
  const schemaValidator = new SchemaValidator(createCard);
  return new CreateCardController(schemaValidator, createCardUsecase);
}
