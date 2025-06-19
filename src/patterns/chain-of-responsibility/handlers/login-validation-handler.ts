import type { AuthRequest, AuthResponse } from '../auth-types'
import { LoginValidationService } from '../services/login-validation-service'

import { AuthHandler } from './base-handler'

export class LoginValidationHandler extends AuthHandler {
  private validationService: LoginValidationService

  constructor() {
    super()
    this.validationService = new LoginValidationService()
  }

  public async handle(request: AuthRequest): Promise<AuthResponse> {
    const validationError = this.validationService.validate(request)

    if (validationError) {
      return validationError
    }

    return this.handleNext(request)
  }
}
