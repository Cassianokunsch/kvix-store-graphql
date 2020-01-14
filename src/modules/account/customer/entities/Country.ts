import 'reflect-metadata';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CommonCollumns } from '../../../helpers/CommonCollumns';

@Entity()
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 2, unique: true })
  abbr: string;

  @Column(() => CommonCollumns)
  commonCollumns: CommonCollumns;
}
