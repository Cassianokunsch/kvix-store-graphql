export interface BaseRepository<T> {
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<void>;
  save(t: T): Promise<void>;
}
