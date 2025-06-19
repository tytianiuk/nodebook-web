import { z } from 'zod'

import type { AuthRequest, AuthResponse } from '../auth-types'

import { BaseValidationService } from './base-validation-service'

import { registerSchema } from '@/app/auth/constants'

export class RegistrationValidationService extends BaseValidationService {
  validate(request: AuthRequest): AuthResponse | null {
    try {
      registerSchema.parse(request)
      return null
    } catch (error) {
      if (error instanceof z.ZodError) {
        return this.createValidationErrorResponse(error)
      }

      return this.createGenericErrorResponse('Невідома помилка валідації')
    }
  }
}
