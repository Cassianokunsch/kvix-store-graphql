import { Repository, getRepository } from 'typeorm';

import { Category } from '../entities';

export class CategoryService {
  private _categoryService: Repository<Category> = getRepository(Category);

  async findById(id: string): Promise<Category> {
    return this._categoryService.findOneOrFail(id);
  }
}
