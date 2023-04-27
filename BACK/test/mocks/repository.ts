type byId = {
  id: string;
};

export class RepositoryInMemory<T extends byId> {
  public items: T[] = [];
  public inputCreate: unknown = null;
  public inputById: unknown = null;
  public inputUpdate: unknown = null;
  public inputDelete: unknown = null;
  public async create(item: T) {
    this.inputCreate = item;
    this.items.push(item);
    return item;
  }

  public async load() {
    return this.items;
  }

  public async loadById(id: string) {
    this.inputById = id;
    const item = this.items.find((item) => item.id === id);
    if (!item) return null;
    return item;
  }

  public async update(data: T) {
    this.inputUpdate = data;
    const itemIndex = this.items.findIndex((item) => item.id === data.id);
    this.items[itemIndex] = data;
    return data;
  }

  public async delete(id: string) {
    this.inputDelete = id;
    const itemIndex = this.items.findIndex((item) => item.id === id);
    this.items.splice(itemIndex, 1);
  }
}
