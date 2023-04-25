import { Card } from "../../domain/entities/card";
import { ICreateUsecase } from "../../domain/usecases/create";

type input = {
  titulo: string;
  conteudo: string;
  lista: string;
};

type ICard = {
  id: string;
  titulo: string;
  conteudo: string;
  lista: string;
};

interface ICreateRepository<T> {
  create: (data: T) => Promise<T>;
}

export class CreateCardUsecase implements ICreateUsecase<input, ICard> {
  constructor(private readonly cardRepository: ICreateRepository<ICard>) {}
  public async execute(data: input): Promise<ICard> {
    const card = new Card(data);
    const newCard = await this.cardRepository.create(card.getCard());
    return newCard;
  }
}

class RepositoryInMemory<T> {
  public items: T[] = [];
  public inputCreate: unknown = null;
  public async create(item: T) {
    this.inputCreate = item;
    this.items.push(item);
    return item;
  }
}

function makeValidCard() {
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
