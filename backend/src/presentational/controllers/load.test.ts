import { makeValidCard } from "../../data/usecases/createCard.test";
import { ILoadUsecase } from "../../domain/usecases/load";
import { ICard } from "../../types/card";
import { NoContent, Ok, ServerError } from "../helpers/http-response";

export class LoadController<T> {
  constructor(private readonly loadUsecase: ILoadUsecase<T>) {}

  public async handle() {
    try {
      const response = await this.loadUsecase.execute();
      if (!response) return NoContent();
      return Ok(response);
    } catch (error) {
      return ServerError();
    }
  }
}

class LoadUsecaseMock<T> implements ILoadUsecase<T[] | null> {
  public items: T[] = [];
  public execeptionError: boolean = false;
  public async execute(): Promise<T[] | null> {
    if (this.execeptionError) throw new Error("error");
    if (this.items.length === 0) return null;
    return this.items;
  }
}

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
