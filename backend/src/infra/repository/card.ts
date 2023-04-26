import { ICard } from "../../types/card";
import { Card } from "../models/card";
import { ICardRepository } from "./contracts/card";

export class CardRepository implements ICardRepository {
  public async create(data: ICard) {
    const card = Card.build(data);
    const newCard = (await card.save()).toJSON<ICard>();
    return newCard;
  }

  public async load() {
    const cards = (await Card.findAll()).map((item) => item.toJSON<ICard>());
    return cards;
  }

  public async loadById(id: string) {
    const card = await Card.findOne({ where: { id } });

    if (!card) return null;
    return card?.toJSON<ICard>();
  }

  public async delete(id: string) {
    await Card.destroy({ where: { id } });
  }

  public async update(data: ICard) {
    await Card.update(data, { where: { id: data.id } });
    return data;
  }
}
