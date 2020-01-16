import 'reflect-metadata';

import { Column, Entity, OneToMany } from 'typeorm';

import { CommonCollumns } from '../../../helpers/CommonCollumns';
import { Address } from './Address';

//export type Gender = 'MALE' | 'FEMALE';

@Entity()
export class Customer extends CommonCollumns {
  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 9, unique: true, name: 'cell_phone' })
  cellPhone: string;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE'] })
  gender: string;

  @OneToMany(
    () => Address,
    c => c.customer,
  )
  addresses: Address[];
}
