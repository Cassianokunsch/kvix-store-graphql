import { Injectable } from '@nestjs/common';
import { Stream } from 'stream';
import { createWriteStream } from 'fs';
import { ImageStored, FileUpload } from '../utils';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImages } from '../entities/productImages.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ProductImages)
    private readonly repository: Repository<ProductImages>,
  ) {}

  private async storeUploadLocal({ stream, filename }: { stream: Stream; filename: string }): Promise<any> {
    const path = 'src/uploads/' + filename;
    const fileStream = createWriteStream(path);

    return new Promise((resolve, reject) =>
      stream
        .pipe(fileStream)
        .on('finish', () => resolve({ path }))
        .on('error', reject),
    );
  }

  private async storeUploadS3() {
    //TODO
  }

  async processUpload(upload: FileUpload): Promise<ImageStored> {
    const { createReadStream, filename, encoding, mimetype } = upload;
    const stream = createReadStream();
    const { path } = await this.storeUploadLocal({ stream, filename });

    return { filename, path, encoding, mimetype };
  }
}
