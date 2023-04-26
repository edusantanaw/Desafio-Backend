import { Card } from "../../domain/entities/card";
import { ICreateUsecase } from "../../domain/usecases/create";
import { ICard } from "../../types/card";
import { ICreateRepository } from "../protocols/repository/create";

export type input = {
  titulo: string;
  conteudo: string;
  lista: string;
};

export class CreateCardUsecase implements ICreateUsecase<input, ICard> {
  constructor(private readonly cardRepository: ICreateRepository<ICard>) {}
  public async execute(data: input): Promise<ICard> {
    const card = new Card(data);
    const newCard = await this.cardRepository.create(card.getCard());
    return newCard;
  }
}
