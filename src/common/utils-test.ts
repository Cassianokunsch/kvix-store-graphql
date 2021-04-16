import { Type, Abstract, Provider } from '@nestjs/common';

export function mockProvider(providerToMock: string | symbol | Type<any> | Abstract<any> | Function, returnValue = {}): Provider {
  return { provide: providerToMock, useValue: returnValue };
}
