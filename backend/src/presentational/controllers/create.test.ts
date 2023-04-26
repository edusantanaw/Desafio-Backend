import { SchemaValidatorMock } from "../../../test/mocks/helpers/schemaValidator";
import { input } from "../../data/usecases/createCard";
import { makeValidCard } from "../../data/usecases/createCard.test";
import { Card } from "../../domain/entities/card";
import { ICreateUsecase } from "../../domain/usecases/create";
import { ICard } from "../../types/card";
import { ServerError } from "../helpers/http-response";
import { CreateCardController } from "./create";

class CreateCardUsecaseMock implements ICreateUsecase<input, ICard> {
  public input: unknown = false;
  public exceptionError: boolean = false;
  public async execute(data: input): Promise<ICard> {
    this.input = data;
    if (this.exceptionError) throw new Error("error");
    const card = new Card(data);
    return card.getCard();
  }
}

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
