import { z } from 'zod'

import { AuthRequest, AuthResponse } from '../auth-types'

import { AuthHandler } from './base-handler'

import { registerSchema } from '@/app/auth/constants'

export class ValidationHandler extends AuthHandler {
  private isRegistration: boolean

  constructor(isRegistration: boolean) {
    super()
    this.isRegistration = isRegistration
  }

  public async handle(request: AuthRequest): Promise<AuthResponse> {
    try {
      if (this.isRegistration) {
        registerSchema.parse(request)
      } else {
        if (!request.email || !request.password) {
          return { success: false, error: 'Заповніть усі поля' }
        }
      }

      return this.handleNext(request)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors
          .map((err) => `${err.path}: ${err.message}`)
          .join(', ')
        return {
          success: false,
          error: `Помилка валідації: ${fieldErrors}`,
        }
      }

      return {
        success: false,
        error: 'Невідома помилка валідації',
      }
    }
  }
}
