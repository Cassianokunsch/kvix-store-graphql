import 'reflect-metadata';

import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { CommonContent } from '../../../shared/entities/CommonContent';
import { City } from './City';
import { Customer } from './Customer';

@ObjectType({ implements: CommonContent })
@Entity()
export class Address extends CommonContent {
  @Field()
  @Column({ type: 'varchar', length: 256 })
  private _street: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  neighborhood: string;

  @Field()
  @Column({ type: 'varchar', length: 8 })
  zipcode: string;

  @Field()
  @Column({ type: 'varchar', length: 10 })
  number: string;

  @Field()
  @Column({ type: 'varchar', length: 256, nullable: true })
  complement?: string;

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Field(() => City)
  @ManyToOne(() => City, { nullable: false })
  @JoinColumn({ name: 'city_id' })
  city: City;

  public get blabla(): string {
    return this._street;
  }
}
