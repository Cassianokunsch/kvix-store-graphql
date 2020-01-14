import { getRepository } from 'typeorm';

import { createWriteStream } from 'fs';
import { Stream } from 'stream';

import { Upload } from '../schemas/interfaces/UploadInterface';
import { Image } from '../schemas/types/ImageType';

const uploadDir = __dirname + '/../../../uploads/';

export class ImageResolver {
  async createImage(upload: Upload): Promise<Image> {
    const { filename, mimetype, encoding, path } = await this.processUpload(upload);
    const image = getRepository(Image).create({ filename, mimetype, encoding, path });
    return await getRepository(Image).save(image);
  }

  async storeUpload({ stream, filename }: { stream: Stream; filename: string }): Promise<any> {
    const path = uploadDir + filename;
    const fileStream = createWriteStream(path);

    return new Promise((resolve, reject) =>
      stream
        .pipe(fileStream)
        .on('finish', () => resolve({ path }))
        .on('error', reject),
    );
  }

  async processUpload(upload: Upload): Promise<Record<string, string>> {
    const { createReadStream, filename, mimetype, encoding } = upload;
    const stream = createReadStream();
    const { path } = await this.storeUpload({ stream, filename });

    return { filename, mimetype, encoding, path };
  }
}
