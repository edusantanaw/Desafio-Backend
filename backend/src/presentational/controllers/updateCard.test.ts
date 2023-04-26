import { SchemaValidatorMock } from "../../../test/mocks/helpers/schemaValidator";
import { UpdateUsecaseMock } from "../../../test/mocks/usecases/updateCard";
import { makeValidCard } from "../../data/usecases/createCard.test";
import { ICard } from "../../types/card";
import { UpdateCardController } from "./updateCard";

function makeSut() {
  const schemaValidator = new SchemaValidatorMock<ICard>();
  const updateCardUsecase = new UpdateUsecaseMock();
  const updateController = new UpdateCardController(
    schemaValidator,
    updateCardUsecase
  );
  return { updateController, schemaValidator, updateCardUsecase };
}

describe("UpdateCardController", () => {
  test("Should call schemaValidor with correct values", async () => {
    const { schemaValidator, updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    await updateController.handle(card);
    expect(schemaValidator.input).toEqual(card);
  });

  test("Should return a badRequest if schema is invalid", async () => {
    const { schemaValidator, updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    schemaValidator.isValid = false;
    const response = await updateController.handle(card);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Schema invalido!");
  });

  test("Should call updateUsecase  with correct values", async () => {
    const { updateCardUsecase, updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    await updateController.handle(card);
    expect(updateCardUsecase.input).toEqual(card);
  });

  test("Should return a notFound if no item exists", async () => {
    const { updateCardUsecase, updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    updateCardUsecase.cardExists = false;
    const response = await updateController.handle(card);
    expect(response.statusCode).toEqual(404);
  });

  test("Should return a serverError if a unexpected error happen", async () => {
    const { updateCardUsecase, updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    updateCardUsecase.exceptionError = true;
    const response = await updateController.handle(card);
    expect(response.statusCode).toEqual(500);
  });

  test("Should return 200 and a updated card", async () => {
    const { updateController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    const response = await updateController.handle(card);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(card);
  });
});
