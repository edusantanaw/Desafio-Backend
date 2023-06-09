import { DeleteController } from "../../src/presentational/controllers/delete";
import {
  NoContent,
  NotFound,
  Ok,
  ServerError,
} from "../../src/presentational/helpers/http-response";
import { ICard } from "../../src/types/card";
import { DeleteUsecaseMock } from "../mocks/usecases/delete";
import { LoadUsecaseMock } from "../mocks/usecases/load";
import { makeValidCard } from "../usecases/createCard.test";

function makeSut() {
  const deleteUsecase = new DeleteUsecaseMock();
  const loadUsecase = new LoadUsecaseMock<ICard>();
  const deleteController = new DeleteController(deleteUsecase, loadUsecase);
  return { deleteController, deleteUsecase, loadUsecase };
}

describe("DeleteController", () => {
  test("Should return a badRequest if a invalid id is provided", async () => {
    const { deleteController } = makeSut();
    const response = await deleteController.handle({ id: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("id invalido!");
  });

  test("Should call deleteUsecase with correct value", async () => {
    const { deleteController, deleteUsecase } = makeSut();
    await deleteController.handle({ id: "any" });
    expect(deleteUsecase.input).toBe("any");
  });

  test("Should return a notFound if item not exists", async () => {
    const { deleteController, deleteUsecase } = makeSut();
    deleteUsecase.cardExists = false;
    const response = await deleteController.handle({ id: "any" });
    expect(response).toEqual(NotFound());
  });

  test("Should return a noContent if loadUsecase return null", async () => {
    const { deleteController } = makeSut();
    const response = await deleteController.handle({ id: "any" });
    expect(response).toEqual(NoContent());
  });

  test("Should return a serverError if a unexpected error happen", async () => {
    const { deleteController, loadUsecase } = makeSut();
    loadUsecase.execeptionError = true;
    const response = await deleteController.handle({ id: "any" });
    expect(response).toEqual(ServerError());
  });

  test("Should return a Ok and all content if is deleted and loadusecase return something", async () => {
    const { deleteController, loadUsecase } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    loadUsecase.items = [card];
    const response = await deleteController.handle({ id: "any" });
    expect(response).toEqual(Ok([card]));
  });
});
