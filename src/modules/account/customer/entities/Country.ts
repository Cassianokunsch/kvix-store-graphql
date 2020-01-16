import 'reflect-metadata';

import { Column, Entity } from 'typeorm';

import { CommonCollumns } from '../../../helpers/CommonCollumns';

@Entity()
export class Country extends CommonCollumns {
  @Column({ type: 'varchar', length: 256, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 2, unique: true })
  abbr: string;
}
