import { IDeleteUsecase } from "../../../src/domain/usecases/delete";

export class DeleteUsecaseMock implements IDeleteUsecase {
  input: unknown = null;
  cardExists = true;
  public async execute(id: string): Promise<boolean> {
    this.input = id;
    if (!this.cardExists) return false;
    return true;
  }
}
