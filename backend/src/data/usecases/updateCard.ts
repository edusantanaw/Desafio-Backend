import { Card } from "../../domain/entities/card";
import { IUpdateUsecase } from "../../domain/usecases/update";
import { ICard } from "../../types/card";
import { IUpdateCarRepository } from "../protocols/repository/updateCard";

export class UpdateCardUsecase implements IUpdateUsecase<ICard> {
  constructor(private readonly cardRepository: IUpdateCarRepository) {}
  public async execute(data: ICard): Promise<ICard | null> {
    const cardExists = await this.cardRepository.loadById(data.id);
    if (!cardExists) return null;
    const card = new Card(data);
    const updatedCard = await this.cardRepository.update(card.getCard());
    return updatedCard;
  }
}