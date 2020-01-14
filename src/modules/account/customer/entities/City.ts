import 'reflect-metadata';

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CommonCollumns } from '../../../helpers/CommonCollumns';
import { Country } from './Country';

@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @ManyToOne(() => Country, { nullable: false })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column(() => CommonCollumns)
  commonCollumns: CommonCollumns;
}
