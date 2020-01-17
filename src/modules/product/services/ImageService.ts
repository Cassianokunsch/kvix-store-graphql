import { Repository, getRepository } from 'typeorm';

import { Image } from '../entities';
import { processUpload, Upload } from '../UtilProduct';

export class ImageService {
  private _imageRepository: Repository<Image> = getRepository(Image);

  async createImage(upload: Upload): Promise<Image> {
    const { filename, mimetype, encoding, path } = await processUpload(upload);
    const image = this._imageRepository.create({ filename, mimetype, encoding, path });
    return await this._imageRepository.save(image);
  }
}
