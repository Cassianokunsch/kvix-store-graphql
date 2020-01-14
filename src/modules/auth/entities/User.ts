import { Field, InterfaceType } from 'type-graphql';
import { Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';

import { hash } from 'bcryptjs';

import { CommonCollumns } from '../../helpers/CommonCollumns';

@InterfaceType()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Field()
  @Column({ type: 'text' })
  password: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column(() => CommonCollumns)
  commonCollumns: CommonCollumns;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
