import { Repository, getRepository } from 'typeorm';

import { Brand } from '../entities';

export class BrandService {
  private _brandService: Repository<Brand> = getRepository(Brand);

  async findById(id: string): Promise<Brand> {
    return this._brandService.findOneOrFail(id);
  }
}
