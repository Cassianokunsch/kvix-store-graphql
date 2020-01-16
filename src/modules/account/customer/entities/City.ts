import 'reflect-metadata';

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonCollumns } from '../../../helpers/CommonCollumns';
import { Country } from './Country';

@Entity()
export class City extends CommonCollumns {
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @ManyToOne(() => Country, { nullable: false })
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
