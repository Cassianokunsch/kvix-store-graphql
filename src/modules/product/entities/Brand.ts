import { Column, Entity } from 'typeorm';

import { CommonCollumns } from '../../helpers/CommonCollumns';

@Entity()
export class Brand extends CommonCollumns {
  @Column({ type: 'varchar', length: 256 })
  name: string;
}
