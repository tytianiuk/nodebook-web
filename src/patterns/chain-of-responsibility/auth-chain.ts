/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthRequest, AuthResponse } from './auth-types'
import { AuthenticationHandler } from './handlers/authentication-handler'
import type { AuthHandler } from './handlers/base-handler'
import { ValidationHandler } from './handlers/validation-handler'

export class AuthChain {
  private firstHandler: AuthHandler

  constructor(isRegistration: boolean) {
    const validationHandler = new ValidationHandler(isRegistration)
    const authenticationHandler = new AuthenticationHandler(isRegistration)

    validationHandler.setNext(authenticationHandler)

    this.firstHandler = validationHandler
  }

  public async process(request: AuthRequest): Promise<AuthResponse> {
    return this.firstHandler.handle(request)
  }
}
