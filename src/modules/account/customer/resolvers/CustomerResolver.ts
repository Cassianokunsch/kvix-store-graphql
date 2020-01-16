import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql';

import { CreateCustomerInput } from '../schemas/inputs';
import { AddressType, CustomerType } from '../schemas/types';
import { CustomerService } from '../services';

@Resolver(CustomerType)
export class CustomerResolver {
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
