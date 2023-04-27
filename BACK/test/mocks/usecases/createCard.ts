import { ICreateUsecase } from "../../../src/domain/usecases/create";
import { ICard } from "../../../src/types/card";
import { Card } from "../../../src/domain/entities/card";
import { input } from "../../../src/data/usecases/createCard";

export class CreateCardUsecaseMock implements ICreateUsecase<input, ICard> {
  public input: unknown = false;
  public exceptionError: boolean = false;
  public async execute(data: input): Promise<ICard> {
    this.input = data;
    if (this.exceptionError) throw new Error("error");
    const card = new Card(data);
    return card.getCard();
  }
}
