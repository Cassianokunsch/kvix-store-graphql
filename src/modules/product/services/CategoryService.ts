import { Repository, getRepository } from 'typeorm';

import { Category } from '../entities';
import { Upload } from '../UtilProduct';
import { ImageService } from './ImageService';

export class CategoryService {
  private _categoryRepository: Repository<Category> = getRepository(Category);
  private _imageService: ImageService = new ImageService();

  async findById(id: string): Promise<Category> {
    return this._categoryRepository.findOneOrFail(id);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this._categoryRepository.find();
  }

  async createCategory(file: Upload, name: string): Promise<Category> {
    const image = await this._imageService.createImage(file);
    const categoryToCreate = this._categoryRepository.create({ name, image: { id: image.id } });
    return await this._categoryRepository.save(categoryToCreate);
  }
}
