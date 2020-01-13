import { Column, Entity, BeforeInsert } from 'typeorm';

import { hash } from 'bcryptjs';

import { CommonContent } from '../../../shared/entities/CommonContent';

@Entity()
export class User extends CommonContent {
  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 9, unique: true, name: 'cell_phone' })
  cellPhone: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
