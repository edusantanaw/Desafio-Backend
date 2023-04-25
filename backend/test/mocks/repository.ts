export class RepositoryInMemory<T> {
    public items: T[] = [];
    public inputCreate: unknown = null;
    public async create(item: T) {
      this.inputCreate = item;
      this.items.push(item);
      return item;
    }

    public async load(){
        return this.items;
    }
  }