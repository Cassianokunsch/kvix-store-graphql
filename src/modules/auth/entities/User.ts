import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

import { hash } from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  password: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
