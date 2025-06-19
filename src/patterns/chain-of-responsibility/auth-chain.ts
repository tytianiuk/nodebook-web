import type { AuthRequest, AuthResponse } from './auth-types'
import { AuthHandlerFactory } from './factories/auth-handler-factory'
import type { AuthHandler } from './handlers/base-handler'

export class AuthChain {
  private handler: AuthHandler

  constructor(isRegistration: boolean) {
    this.handler = isRegistration
      ? AuthHandlerFactory.createRegistrationChain()
      : AuthHandlerFactory.createLoginChain()
  }

  public async process(request: AuthRequest): Promise<AuthResponse> {
    return this.handler.handle(request)
  }
}
