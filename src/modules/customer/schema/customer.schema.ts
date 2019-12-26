import { gql } from 'apollo-server';

export const CustomerTypeDefs = gql`
  scalar UUID
  scalar DateTime

  enum Gender {
    MALE
    FEMALE
  }

  input CustomerCreateInput {
    name: String!
    cpf: String!
    gender: Gender!
    email: String!
    cellPhone: String!
    password: String!
  }

  type Query {
    customers: [Customer!]
  }

  type Mutation {
    createCustomer(input: CustomerCreateInput): Customer!
  }

  type Customer {
    id: UUID!
    name: String!
    cpf: String!
    gender: Gender!
    email: String!
    cellPhone: String!
  }
`;
