import { RepositoryInMemory } from "../mocks/repository";
import { ICard } from "../../src/types/card";
import { makeValidCard } from "./createCard.test";
import { DeleteCardUsecase } from "../../src/data/usecases/deleteCard";

function makeSut() {
  const cardRepository = new RepositoryInMemory<ICard>();
  const deleteCardUsecase = new DeleteCardUsecase(cardRepository);
  return { cardRepository, deleteCardUsecase };
}

describe("DeleteCardUsecase", () => {
  test("Should call cardRepository.loadById with correct value", async () => {
    const { cardRepository, deleteCardUsecase } = makeSut();
    await deleteCardUsecase.execute("any_id");
    expect(cardRepository.inputById).toBe("any_id");
  });

  test("Should return false if card not exists", async () => {
    const { deleteCardUsecase } = makeSut();
    const response = await deleteCardUsecase.execute("any_id");
    expect(response).toBe(false);
  });

  test("Should call cardRepository.delete with correct value", async () => {
    const { deleteCardUsecase, cardRepository } = makeSut();
    cardRepository.items = [{ ...makeValidCard(), id: "any" }];
    await deleteCardUsecase.execute("any");
    expect(cardRepository.inputDelete).toBe("any");
  });

  test("Should return true if card is deleted", async () => {
    const { deleteCardUsecase, cardRepository } = makeSut();
    cardRepository.items = [{ ...makeValidCard(), id: "any" }];
    const response = await deleteCardUsecase.execute("any");
    expect(response).toBe(true);
  });
});
