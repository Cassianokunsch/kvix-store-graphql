import { Field, InterfaceType } from 'type-graphql';
import { Column, BeforeInsert } from 'typeorm';

import { hash } from 'bcryptjs';

import { CommonContent } from '../../../helpers/entities/CommonContent';

@InterfaceType()
export abstract class User extends CommonContent {
  @Field()
  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Field()
  @Column({ type: 'text' })
  password: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
