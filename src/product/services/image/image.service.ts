import { Injectable } from '@nestjs/common';

import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { Stream } from 'stream';
import { FindManyOptions } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ProductImages } from '../../entities/productImages.entity';
import { ImageStored } from './image-stored.interface';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(private readonly repository: ImageRepository) {}

  private async storeUploadLocal(stream: Stream, filename: string): Promise<any> {
    const path = 'src/product/uploads/' + filename;
    const fileStream = createWriteStream(path);

    return new Promise((resolve, reject) =>
      stream
        .pipe(fileStream)
        .on('finish', () => resolve({ path }))
        .on('error', reject),
    );
  }

  async processUpload(upload: FileUpload): Promise<ImageStored> {
    const { createReadStream, encoding, mimetype } = await upload;
    const newFilename = uuidv4() + '.' + mimetype.split('/')[1];
    const stream = createReadStream();
    const { path } = await this.storeUploadLocal(stream, newFilename);

    return { newFilename, path, encoding, mimetype };
  }

  async create(upload: FileUpload, productId: string): Promise<ProductImages> {
    const { newFilename, path, encoding, mimetype } = await this.processUpload(upload);
    return await this.repository.insert({ filename: newFilename, path, encoding, mimetype, product: { id: productId } });
  }

  async createMany(uploads: FileUpload[], productId: string): Promise<ProductImages[]> {
    const imagesSaved = uploads.map(async upload => {
      return await this.create(upload, productId);
    });

    return Promise.all(imagesSaved);
  }

  async findAll(options?: FindManyOptions<ProductImages>): Promise<ProductImages[]> {
    return await this.repository.findAll(options);
  }
}
