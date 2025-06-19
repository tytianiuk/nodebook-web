import type { AuthRequest, AuthResponse } from '../auth-types'
import { RegistrationService } from '../services/registration-service'

import { AuthHandler } from './base-handler'

export class RegistrationHandler extends AuthHandler {
  private registrationService: RegistrationService

  constructor() {
    super()
    this.registrationService = new RegistrationService()
  }

  public async handle(request: AuthRequest): Promise<AuthResponse> {
    return await this.registrationService.execute(request)
  }
}
