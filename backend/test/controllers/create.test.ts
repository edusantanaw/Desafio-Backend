import { input } from "../../src/data/usecases/createCard";
import { CreateCardController } from "../../src/presentational/controllers/create";
import { ServerError } from "../../src/presentational/helpers/http-response";
import { SchemaValidatorMock } from "../mocks/helpers/schemaValidator";
import { CreateCardUsecaseMock } from "../mocks/usecases/createCard";
import { makeValidCard } from "../usecases/createCard.test";

function makeSut() {
  const schemaValidor = new SchemaValidatorMock<input>();
  const createUsecase = new CreateCardUsecaseMock();
  const createCardController = new CreateCardController(
    schemaValidor,
    createUsecase
  );
  return { createCardController, schemaValidor, createUsecase };
}

describe("CreateCardController", () => {
  test("Should call schemaValidator with correct values", async () => {
    const { createCardController, schemaValidor } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    await createCardController.handle(card);
    expect(schemaValidor.input).toEqual(card);
  });

  test("Should return a badRequest if values provided is invalid", async () => {
    const { createCardController, schemaValidor } = makeSut();
    schemaValidor.isValid = false;
    const card = { ...makeValidCard(), id: "any" };
    const response = await createCardController.handle(card);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Schema invalido!");
  });

  test("Should call createUsecase with correct values", async () => {
    const { createCardController, createUsecase } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    await createCardController.handle(card);
    expect(createUsecase.input).toEqual(card);
  });

  test("Should return a server error is a unexpected error happen", async () => {
    const { createCardController, createUsecase } = makeSut();
    createUsecase.exceptionError = true;
    const card = { ...makeValidCard(), id: "any" };
    const response = await createCardController.handle(card);
    expect(response).toEqual(ServerError());
  });

  test("Should return a server error is a unexpected error happen", async () => {
    const { createCardController, createUsecase } = makeSut();
    createUsecase.exceptionError = true;
    const card = { ...makeValidCard(), id: "any" };
    const response = await createCardController.handle(card);
    expect(response).toEqual(ServerError());
  });

  test("Should return ok and a created card", async () => {
    const { createCardController } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    const response = await createCardController.handle(card);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(card);
  });
});
