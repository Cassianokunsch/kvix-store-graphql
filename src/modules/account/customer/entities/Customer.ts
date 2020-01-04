import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Address } from './Address';

export type Gender = 'MALE' | 'FEMALE';

@ObjectType()
@Entity()
export class Customer {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Field()
  @Column({ type: 'varchar', length: 9, unique: true, name: 'cell_phone' })
  cellPhone: string;

  @Field()
  @Column({ type: 'enum', enum: ['MALE', 'FEMALE'] })
  gender: Gender;

  @Field(() => [Address], { nullable: true })
  @OneToMany(
    () => Address,
    c => c.customer,
  )
  addresses: Address[];

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

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
