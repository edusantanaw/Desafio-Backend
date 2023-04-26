import { ICard } from "../../types/card";
import { Card } from "../models/card";

export class CardRepository {
  public async create(data: ICard) {
    const card = await Card.create({
      data,
    });
    const newCard = (await card.save()).toJSON<ICard>();
    return newCard;
  }

  public async load() {
    const cards = (await Card.findAll()).forEach((item) =>
      item.toJSON<ICard>()
    );
    return cards;
  }

  public async loadById(id: string) {
    const card = await Card.findOne({ where: { id } });
    return card?.toJSON<ICard>();
  }

  public async remove(id: string) {
    await Card.destroy({ where: { id } });
  }

  public async update(data: ICard) {
    await Card.update(data, { where: { id: data.id } });
    return data;
  }
}
