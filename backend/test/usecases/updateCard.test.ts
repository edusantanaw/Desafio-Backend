import { RepositoryInMemory } from "../mocks/repository";
import { ICard } from "../../src/types/card";
import { makeValidCard } from "./createCard.test";
import { UpdateCardUsecase } from "../../src/data/usecases/updateCard";

function makeSut() {
  const cardRepository = new RepositoryInMemory<ICard>();
  cardRepository.items = [{ ...makeValidCard(), id: "any" }];
  const updateCardUsecase = new UpdateCardUsecase(cardRepository);
  return { cardRepository, updateCardUsecase };
}

describe("UpdateCardUsecase", () => {
  test("Should call repository.loadById with correct value", async () => {
    const { updateCardUsecase, cardRepository } = makeSut();
    await updateCardUsecase.execute({ ...makeValidCard(), id: "any_id" });
    expect(cardRepository.inputById).toBe("any_id");
  });

  test("Should return null if card is not found", async () => {
    const { updateCardUsecase, cardRepository } = makeSut();
    cardRepository.items = [];
    const response = await updateCardUsecase.execute({
      ...makeValidCard(),
      id: "any",
    });
    expect(response).toBe(null);
  });

  test("Should call cardRepository.update with correct values", async () => {
    const { updateCardUsecase, cardRepository } = makeSut();
    await updateCardUsecase.execute({
      ...makeValidCard(),
      id: "any",
    });
    expect(cardRepository.inputUpdate).toEqual({
      ...makeValidCard(),
      id: "any",
    });
  });

  test("Should return a updatedCard", async () => {
    const { updateCardUsecase } = makeSut();
    const response = await updateCardUsecase.execute({
      ...makeValidCard(),
      id: "any",
    });
    expect(response).toEqual({
      ...makeValidCard(),
      id: "any",
    });
  });
});
