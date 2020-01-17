import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { CommonCollumns } from '../../helpers/CommonCollumns';
import { Image } from './';

@Entity()
export class Category extends CommonCollumns {
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;
}
