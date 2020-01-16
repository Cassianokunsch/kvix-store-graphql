import { Column, Entity } from 'typeorm';

import { CommonCollumns } from '../../helpers/CommonCollumns';

@Entity()
export class Roles extends CommonCollumns {
  @Column({ type: 'varchar', length: 256 })
  name: string;
}
