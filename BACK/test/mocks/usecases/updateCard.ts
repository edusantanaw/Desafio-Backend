import { Card } from "../../../src/domain/entities/card";
import { IUpdateUsecase } from "../../../src/domain/usecases/update";
import { ICard } from "../../../src/types/card";

export class UpdateUsecaseMock implements IUpdateUsecase<ICard> {
    public cardExists = true;
    public input: unknown = null;
    public exceptionError: boolean = false;
    public async execute(data: ICard): Promise<ICard | null> {
      this.input = data;
      if (!this.cardExists) return null;
      if (this.exceptionError) throw new Error("Internal server error!");
      const updateCard = new Card(data);
      return updateCard.getCard();
    }
  }