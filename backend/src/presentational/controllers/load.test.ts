import { LoadUsecaseMock } from "../../../test/mocks/usecases/load";
import { makeValidCard } from "../../data/usecases/createCard.test";
import { ICard } from "../../types/card";
import { ServerError } from "../helpers/http-response";
import { LoadController } from "./load";

function makeSut() {
  const loadUsecase = new LoadUsecaseMock<ICard>();
  const loadController = new LoadController(loadUsecase);
  return { loadController, loadUsecase };
}

describe("LoadController", () => {
  test("Should return NoContent if any data is found", async () => {
    const { loadController } = makeSut();
    const response = await loadController.handle();
    expect(response.statusCode).toBe(204);
  });

  test("Should return a server error if a unexpected error happen", async () => {
    const { loadController, loadUsecase } = makeSut();
    loadUsecase.execeptionError = true;
    const response = await loadController.handle();
    expect(response).toEqual(ServerError());
  });

  test("Should return Ok and all content if data is found", async () => {
    const { loadController, loadUsecase } = makeSut();
    const card = { ...makeValidCard(), id: "any_id" };
    loadUsecase.items = [card];
    const response = await loadController.handle();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([card]);
  });
});
