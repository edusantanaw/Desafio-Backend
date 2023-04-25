export interface IloadByIdRepository<T> {
    loadById: (id: string) => Promise<T | null>;
  }