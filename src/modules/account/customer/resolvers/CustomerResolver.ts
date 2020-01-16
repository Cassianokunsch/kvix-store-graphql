import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql';

import { CreateCustomerInput } from '../schemas/inputs/CustomerInputs';
import { AddressType } from '../schemas/types/AddressType';
import { CustomerType } from '../schemas/types/CustomerType';
import { CustomerService } from '../services/CustomerService';

@Resolver(CustomerType)
class CustomerResolver {
  private _customerService: CustomerService = new CustomerService();

  @Mutation(() => CustomerType)
  async createCustomer(@Arg('input') { cellPhone, cpf, gender }: CreateCustomerInput): Promise<CustomerType> {
    return await this._customerService.createCustomer(cellPhone, cpf, gender);
  }

  @Query(() => [CustomerType], { nullable: true })
  async customers(): Promise<CustomerType[]> {
    return await this._customerService.getAllCustomers();
  }

  @FieldResolver()
  async addresses(@Root() { id }: CustomerType): Promise<AddressType[]> {
    return await this._customerService.getFieldResolverAddress(id);
  }
}

export default CustomerResolver;
