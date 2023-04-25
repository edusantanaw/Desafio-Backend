export interface ILoadRepository<T> {
    load: () => Promise<T>;
  }
  