import type { AuthRequest, AuthResponse } from '../auth-types'

import { BaseAuthService } from './base-auth-service'

import AuthAPI from '@/api/auth-api'
import { AUTH_ERROR_MESSAGES } from '@/constants/error-messages'

export class RegistrationService extends BaseAuthService {
  async execute(request: AuthRequest): Promise<AuthResponse> {
    try {
      const { username, email, password } = request

      const registrationResponse = await this.performRegistration(
        username!,
        email,
        password,
      )

      if (registrationResponse.status !== 201) {
        return this.createErrorResponse(AUTH_ERROR_MESSAGES.REGISTRATION_FAILED)
      }

      const loginResponse = await AuthAPI.login(email, password)
      const user = await this.getUserProfile()

      return this.createSuccessResponse(user, {
        registrationResponse,
        loginResponse,
      })
    } catch {
      return this.createErrorResponse(AUTH_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS)
    }
  }

  private async performRegistration(
    username: string,
    email: string,
    password: string,
  ) {
    return await AuthAPI.register(username, email, password)
  }
}
