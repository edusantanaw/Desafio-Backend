import { RepositoryInMemory } from "../../../test/mocks/repository";
import { ICard } from "../../types/card";
import { makeValidCard } from "./createCard.test";
import { LoadUsecase } from "./load";

function makeSut() {
  const cardRepository = new RepositoryInMemory<ICard>();
  const loadUsecase = new LoadUsecase<ICard>(cardRepository);
  return { loadUsecase, cardRepository };
}

describe("LoadUsecase", () => {
  test("Should return null if no one card is found", async () => {
    const { loadUsecase } = makeSut();
    const response = await loadUsecase.execute();
    expect(response).toBe(null);
  });

  test("Should return null if no one card is found", async () => {
    const { loadUsecase, cardRepository } = makeSut();
    const card = { ...makeValidCard(), id: "any" };
    cardRepository.items = [card];
    const response = await loadUsecase.execute();
    expect(response).toEqual([card]);
  });
});
