import { z } from 'zod'

import type { AuthRequest, AuthResponse } from '../auth-types'

import { AuthHandler } from './base-handler'

import { registerSchema } from '@/app/auth/constants'
import { AuthResponseHelper } from '@/utils/auth-response-utils'

export class RegistrationValidationHandler extends AuthHandler {
  public async handle(request: AuthRequest): Promise<AuthResponse> {
    try {
      registerSchema.parse(request)
      return this.handleNext(request)
    } catch (error) {
      const zodError = error as z.ZodError
      const fieldErrors = zodError.errors
        .map((err) => `${err.path}: ${err.message}`)
        .join(', ')
      return AuthResponseHelper.validationError(fieldErrors)
    }
  }
}
