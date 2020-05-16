import { Injectable } from '@nestjs/common';
import { Stream } from 'stream';
import { createWriteStream } from 'fs';
import { ImageStored, FileUpload } from '../../utils';

@Injectable()
export class ImageService {
  private async storeUploadLocal({ stream, filename }: { stream: Stream; filename: string }): Promise<any> {
    const path = __dirname + filename;
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
    const { createReadStream, filename } = upload;
    console.log({ ...upload });
    const stream = createReadStream();
    const { path } = await this.storeUploadLocal({ stream, filename });

    return { filename, path };
  }
}
