import { ICard } from "../../../types/card";
import { IloadByIdRepository } from "./loadById";

export interface IUpdateCarRepository extends IloadByIdRepository<ICard> {
  update: (data: ICard) => Promise<ICard>;
}
