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

export class CreateCardUsecase implements ICreateUsecase<input, ICard> {
  public async execute(data: input): Promise<ICard> {
    const card = new Card(data);
    return card.getCard();
  }
}

function makeValidCard() {
  return {
    conteudo: "any_content",
    lista: "any_list",
    titulo: "any_title",
  };
}

describe("CreateCardUsecase", () => {
  test("Should return a new card if is created", async () => {
    const createCardUsecase = new CreateCardUsecase();
    const response =await createCardUsecase.execute(makeValidCard());
    const {id, ...rest} = response;
    expect(rest).toEqual(makeValidCard());
  });
});
