import { DeepPartial, Repository } from 'typeorm';

export abstract class BaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.genericRepository.find();
  }

  async findById(id: string): Promise<T> {
    return await this.genericRepository.findOne(id);
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    return await this.genericRepository.save(entity);
  }
}
