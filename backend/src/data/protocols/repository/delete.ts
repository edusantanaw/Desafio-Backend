import { IloadByIdRepository } from "./loadById";

export interface IDeleteRepository<T> extends IloadByIdRepository<T> {
  delete: (id: string) => Promise<void>;
}
