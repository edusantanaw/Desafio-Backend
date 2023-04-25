import { ILoadUsecase } from "../../domain/usecases/load";
import { ILoadRepository } from "../protocols/repository/load";

export class LoadUsecase<T> implements ILoadUsecase<T[] | null> {
  constructor(private readonly repository: ILoadRepository<T[]>) {}

  public async execute(): Promise<T[] | null> {
    const cards = await this.repository.load();
    if (cards.length === 0) return null;
    return cards;
  }
}
