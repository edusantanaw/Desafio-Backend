import { RepositoryInMemory } from "../mocks/repository";
import { ICard } from "../../src/types/card";
import { CreateCardUsecase } from "../../src/data/usecases/createCard";

export function makeValidCard() {
  return {
    conteudo: "any_content",
    lista: "any_list",
    titulo: "any_title",
  };
}

function makeSut() {
  const cardRepository = new RepositoryInMemory<ICard>();
  const createCardUsecase = new CreateCardUsecase(cardRepository);
  return { createCardUsecase, cardRepository };
}

describe("CreateCardUsecase", () => {
  test("Should call cardRepository with correct values", async () => {
    const { createCardUsecase, cardRepository } = makeSut();
    await createCardUsecase.execute({ ...makeValidCard() });
    const { id, ...rest } = cardRepository.inputCreate as ICard;
    expect(rest).toEqual(makeValidCard());
  });

  test("Should return a new card if is created", async () => {
    const { createCardUsecase } = makeSut();
    const response = await createCardUsecase.execute(makeValidCard());
    const { id, ...rest } = response;
    expect(rest).toEqual(makeValidCard());
  });
});
