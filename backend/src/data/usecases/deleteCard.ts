import { IDeleteUsecase } from "../../domain/usecases/delete";
import { ICard } from "../../types/card";
import { IDeleteRepository } from "../protocols/repository/delete";

export class DeleteCardUsecase implements IDeleteUsecase {
    constructor(private readonly cardRepository: IDeleteRepository<ICard>) {}
  
    public async execute(id: string): Promise<boolean> {
      const cardExists = await this.cardRepository.loadById(id);
      if (!cardExists) return false;
      await this.cardRepository.delete(id);
      return true;
    }
  }
  