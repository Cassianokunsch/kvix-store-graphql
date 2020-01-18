import { createWriteStream } from 'fs';
import { Stream } from 'stream';

export const uploadDir = __dirname + '/../../../uploads/';

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

export const storeUpload = async ({ stream, filename }: { stream: Stream; filename: string }): Promise<any> => {
  const path = uploadDir + filename;
  const fileStream = createWriteStream(path);

  return new Promise((resolve, reject) =>
    stream
      .pipe(fileStream)
      .on('finish', () => resolve({ path }))
      .on('error', reject),
  );
};

export const processUpload = async (upload: Upload): Promise<Record<string, string>> => {
  const { createReadStream, filename, mimetype, encoding } = upload;
  const stream = createReadStream();
  const { path } = await storeUpload({ stream, filename });

  return { filename, mimetype, encoding, path };
};
