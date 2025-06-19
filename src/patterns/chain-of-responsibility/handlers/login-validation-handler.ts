import type { AuthRequest, AuthResponse } from '../auth-types'

import { AuthHandler } from './base-handler'

import { AuthResponseHelper } from '@/utils/auth-response-utils'

export class LoginValidationHandler extends AuthHandler {
  public async handle(request: AuthRequest): Promise<AuthResponse> {
    if (!request.email || !request.password) {
      return AuthResponseHelper.error('Заповніть усі поля')
    }

    if (!this.isValidEmail(request.email)) {
      return AuthResponseHelper.error('Невірний формат email')
    }

    return this.handleNext(request)
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
