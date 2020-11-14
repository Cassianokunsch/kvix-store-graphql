import { Injectable } from '@nestjs/common';
import { Repository, EntityManager, ObjectType, FindManyOptions, DeepPartial, SaveOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { createNamespace } from 'cls-hooked';

const cls = createNamespace('app');

@Injectable()
export abstract class BaseRepository<T> {
  constructor(private readonly manager: EntityManager, private entityType: ObjectType<T>) {}

  protected get repository(): Repository<T> {
    const entityManager: EntityManager = cls.get('transaction_manager') || this.manager;
    return entityManager.getRepository(this.entityType.name);
  }

  async runInTransaction<P>(fn: () => Promise<P>): Promise<P> {
    return await this.manager.transaction(
      async transacionManager =>
        await cls.runAndReturn(async () => {
          cls.set('transaction_manager', transacionManager);
          return await fn();
        }),
    );
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findById(id: string): Promise<T> {
    return await this.repository.findOne(id);
  }

  async insert(data: DeepPartial<T>, options?: SaveOptions): Promise<T> {
    return await this.repository.save(data, options);
  }

  async fakeDelete(data: DeepPartial<T>): Promise<void> {
    await this.repository.softRemove(data);
  }

  async update(id: string, partialEntity: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, partialEntity);
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}
