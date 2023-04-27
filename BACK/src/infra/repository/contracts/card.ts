import {
  ICreateRepository,
  IDeleteRepository,
  ILoadRepository,
  IloadByIdRepository,
} from "../../../data/protocols/repository";
import { ICard } from "../../../types/card";

export interface ICardRepository
  extends ICreateRepository<ICard>,
    IDeleteRepository<ICard>,
    IloadByIdRepository<ICard>,
    ILoadRepository<ICard[]> {}
