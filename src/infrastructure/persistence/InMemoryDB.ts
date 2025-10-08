export class InMemoryDB {
  private static instance: InMemoryDB;
  private data: Map<string, Map<string, any>>;

  private constructor() {
    this.data = new Map();
  }

  public static getInstance(): InMemoryDB {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = new InMemoryDB();
    }
    return InMemoryDB.instance;
  }

  public getCollection<T>(collectionName: string): Map<string, T> {
    if (!this.data.has(collectionName)) {
      this.data.set(collectionName, new Map());
    }
    return this.data.get(collectionName) as Map<string, T>;
  }

  public clearCollection(collectionName: string): void {
    this.data.delete(collectionName);
  }

  public clearAll(): void {
    this.data.clear();
  }
}
