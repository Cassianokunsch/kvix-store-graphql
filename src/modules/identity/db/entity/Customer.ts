import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type Gender = 'Male' | 'Female';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  cellPhone: string;

  @Column({ type: 'enum', enum: ['Male', 'Female'] })
  gender: Gender;
}
