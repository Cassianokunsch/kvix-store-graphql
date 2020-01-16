import { Resolver, Mutation, Arg } from 'type-graphql';

import { LoginInput } from '../schemas/inputs/LoginInput';
import { SignUpInput } from '../schemas/inputs/SignInInput';
import { Payload } from '../schemas/types/PayloadType';
import { AuthService } from '../services/AuthService';

@Resolver()
export class AuthResolver {
  private _authService: AuthService = new AuthService();

  @Mutation(() => Payload)
  async login(@Arg('authInput') { email, password }: LoginInput): Promise<Payload> {
    return this._authService.login(email, password);
  }

  @Mutation(() => Payload)
  async signUp(@Arg('signUpInput') { email, name, password }: SignUpInput): Promise<Payload> {
    return this._authService.signUp(email, name, password);
  }
}
