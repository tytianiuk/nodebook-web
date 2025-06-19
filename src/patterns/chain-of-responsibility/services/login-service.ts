import type { AuthRequest, AuthResponse } from '../auth-types'

import { BaseAuthService } from './base-auth-service'

import AuthAPI from '@/api/auth-api'
import { AUTH_ERROR_MESSAGES } from '@/constants/error-messages'

export class LoginService extends BaseAuthService {
  async execute(request: AuthRequest): Promise<AuthResponse> {
    try {
      const { email, password } = request

      await AuthAPI.login(email, password)
      const user = await this.getUserProfile()

      return this.createSuccessResponse(user)
    } catch {
      return this.createErrorResponse(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS)
    }
  }
}
