import type { AuthRequest, AuthResponse } from '../auth-types'

import { BaseValidationService } from './base-validation-service'

export class LoginValidationService extends BaseValidationService {
  validate(request: AuthRequest): AuthResponse | null {
    if (!request.email || !request.password) {
      return this.createGenericErrorResponse('Заповніть усі поля')
    }

    if (!this.isValidEmail(request.email)) {
      return this.createGenericErrorResponse('Невірний формат email')
    }

    return null
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
