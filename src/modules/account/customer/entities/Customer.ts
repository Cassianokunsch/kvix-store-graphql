import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { User } from '../../../auth/entities/User';
import { CommonCollumns } from '../../../helpers/CommonCollumns';
import { Address } from './Address';

export type Gender = 'MALE' | 'FEMALE';

@ObjectType({ implements: User })
@Entity()
export class Customer extends User {
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

  @Column(() => CommonCollumns)
  commonCollumns: CommonCollumns;
}
