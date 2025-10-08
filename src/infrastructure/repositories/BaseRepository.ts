import { InMemoryDB } from '../persistence/InMemoryDB';

export abstract class BaseRepository<T> {
  protected collection: Map<string, T>;
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    const db = InMemoryDB.getInstance();
    this.collection = db.getCollection<T>(collectionName);
  }

  async findById(id: string): Promise<T | undefined> {
    return this.collection.get(id);
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.collection.values());
  }

  async save(id: string, entity: T): Promise<T> {
    this.collection.set(id, entity);
    return entity;
  }

  async delete(id: string): Promise<boolean> {
    return this.collection.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.collection.has(id);
  }
}
