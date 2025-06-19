import type { AuthRequest, AuthResponse } from '../auth-types'
import { RegistrationValidationService } from '../services/registration-validation-service'

import { AuthHandler } from './base-handler'

export class RegistrationValidationHandler extends AuthHandler {
  private validationService: RegistrationValidationService

  constructor() {
    super()
    this.validationService = new RegistrationValidationService()
  }

  public async handle(request: AuthRequest): Promise<AuthResponse> {
    const validationError = this.validationService.validate(request)

    if (validationError) {
      return validationError
    }

    return this.handleNext(request)
  }
}
