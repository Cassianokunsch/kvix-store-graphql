import { Field, ObjectType } from 'type-graphql';

import { MutationResponseInterface } from '../../../helpers/MutationResponseInterface';

@ObjectType({ implements: MutationResponseInterface })
export class SingInResponse implements MutationResponseInterface {
  code: string;
  message: string;
  success: boolean;
  @Field()
  token: string;

  constructor(code: string, message: string, sucess: boolean, token: string) {
    this.code = code;
    this.message = message;
    this.success = sucess;
    this.token = token;
  }
}