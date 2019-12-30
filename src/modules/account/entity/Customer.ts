import 'reflect-metadata';
import { Entity, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Address } from './Address';
import { hash } from 'bcryptjs';

export type Gender = 'MALE' | 'FEMALE';

@ObjectType()
@Entity()
export class Customer {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 256 })
  password: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  role: string;

  @Field()
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Field()
  @Column({ type: 'varchar', length: 256, unique: true, name: 'cell_phone' })
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

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'created_at' })
  createdAt: string;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP', name: 'updated_at' })
  updatedAt: string;

  @Field()
  @Column({ type: 'boolean', default: () => false })
  deleted: boolean;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
