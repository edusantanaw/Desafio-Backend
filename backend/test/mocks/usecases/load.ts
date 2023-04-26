import { ILoadUsecase } from "../../../src/domain/usecases/load";

export class LoadUsecaseMock<T> implements ILoadUsecase<T[] | null> {
  public items: T[] = [];
  public execeptionError: boolean = false;
  public async execute(): Promise<T[] | null> {
    if (this.execeptionError) throw new Error("error");
    if (this.items.length === 0) return null;
    return this.items;
  }
}
