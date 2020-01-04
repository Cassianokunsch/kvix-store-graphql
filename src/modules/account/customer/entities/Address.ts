import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { City } from './City';
import { Customer } from './Customer';

@ObjectType()
@Entity()
export class Address {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  street: string;

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

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @Field()
  @Column({ type: 'boolean', default: () => false })
  deleted: boolean;
}
