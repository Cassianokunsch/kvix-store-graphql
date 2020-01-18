import { Column, BeforeInsert, Entity } from 'typeorm';

import { hash } from 'bcryptjs';

import { CommonCollumns } from '../../helpers/CommonCollumns';

@Entity()
export class User extends CommonCollumns {
  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
