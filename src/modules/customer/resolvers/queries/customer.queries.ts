import 'reflect-metadata';
import { Customer } from '../../db/entity/Customer';

export const customers = async (): Promise<Customer[]> => {
  return await Customer.find();
};
