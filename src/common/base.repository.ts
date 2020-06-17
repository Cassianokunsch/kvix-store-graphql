import { Injectable } from '@nestjs/common';

import { createNamespace } from 'cls-hooked';
import { Repository, EntityManager, ObjectType, FindManyOptions, DeepPartial, SaveOptions } from 'typeorm';

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
}
