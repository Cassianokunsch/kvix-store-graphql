import { Column, Entity } from 'typeorm';

import { CommonCollumns } from '../../helpers/CommonCollumns';

@Entity()
export class Image extends CommonCollumns {
  @Column({ type: 'text' })
  filename: string;

  @Column({ type: 'varchar', length: 256 })
  mimetype: string;

  @Column({ type: 'varchar', length: 256 })
  encoding: string;

  @Column({ type: 'text' })
  path: string;
}
