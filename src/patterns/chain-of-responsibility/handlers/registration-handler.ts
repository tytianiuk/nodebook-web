import type { AuthRequest, AuthResponse } from '../auth-types'

import { AuthHandler } from './base-handler'

import AuthAPI from '@/api/auth-api'
import { AUTH_ERROR_MESSAGES } from '@/constants/error-messages'
import { AuthResponseHelper } from '@/utils/auth-response-utils'

export class RegistrationHandler extends AuthHandler {
  public async handle(request: AuthRequest): Promise<AuthResponse> {
    try {
      const { username, email, password } = request

      const registrationResponse = await AuthAPI.register(
        username!,
        email,
        password,
      )
      const loginResponse = await AuthAPI.login(email, password)
      const userResponse = await AuthAPI.getMe()

      return AuthResponseHelper.success(userResponse.data, {
        registrationResponse,
        loginResponse,
      })
    } catch {
      return AuthResponseHelper.error(AUTH_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS)
    }
  }
}
