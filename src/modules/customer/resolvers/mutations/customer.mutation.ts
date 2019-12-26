import 'reflect-metadata';
import { Customer, Gender } from '../../db/entity/Customer';

export interface CustomerCreateInput {
  name: string;
  email: string;
  password: string;
  cpf: string;
  gender: Gender;
  cellPhone: string;
}

export const createCustomer = async (_: any, { input }: { input: CustomerCreateInput }): Promise<Customer> => {
  const customer = Customer.create(input);
  return await customer.save();
};
