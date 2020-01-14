import 'reflect-metadata';

import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import { CommonCollumns } from '../../../helpers/CommonCollumns';
import { City } from './City';
import { Customer } from './Customer';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256 })
  street: string;

  @Column({ type: 'varchar', length: 256 })
  neighborhood: string;

  @Column({ type: 'varchar', length: 8 })
  zipcode: string;

  @Column({ type: 'varchar', length: 10 })
  number: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  complement?: string;

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => City, { nullable: false })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column(() => CommonCollumns)
  commonCollumns: CommonCollumns;
}
