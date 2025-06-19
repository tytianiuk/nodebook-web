import type { AuthRequest, AuthResponse } from '../auth-types'

import { AuthHandler } from './base-handler'

import AuthAPI from '@/api/auth-api'
import { AUTH_ERROR_MESSAGES } from '@/constants/error-messages'
import { AuthResponseHelper } from '@/utils/auth-response-utils'

export class LoginHandler extends AuthHandler {
  public async handle(request: AuthRequest): Promise<AuthResponse> {
    try {
      const { email, password } = request

      await AuthAPI.login(email, password)
      const userResponse = await AuthAPI.getMe()

      return AuthResponseHelper.success(userResponse.data)
    } catch {
      return AuthResponseHelper.error(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS)
    }
  }
}
