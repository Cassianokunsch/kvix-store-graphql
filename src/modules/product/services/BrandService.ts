import { Repository, getRepository } from 'typeorm';

import { Brand } from '../entities';

export class BrandService {
  private _brandRepository: Repository<Brand> = getRepository(Brand);

  async findById(id: string): Promise<Brand> {
    return this._brandRepository.findOneOrFail(id);
  }

  async getAllBrands(): Promise<Brand[]> {
    return await this._brandRepository.find();
  }

  async createBrand(name: string): Promise<Brand> {
    const brandToCreate = this._brandRepository.create({ name });
    return await this._brandRepository.save(brandToCreate);
  }
}
