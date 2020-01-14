import { Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';

import { hash } from 'bcryptjs';

import { CommonCollumns } from '../../helpers/CommonCollumns';

export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column(() => CommonCollumns)
  commonCollumns: CommonCollumns;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
