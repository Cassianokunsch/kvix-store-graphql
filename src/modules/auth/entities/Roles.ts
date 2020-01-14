import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CommonCollumns } from '../../helpers/CommonCollumns';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column(() => CommonCollumns)
  commonCollumns: CommonCollumns;
}
