import type { z } from 'zod'

import type { AuthRequest, AuthResponse } from '../auth-types'

export abstract class BaseValidationService {
  protected createValidationErrorResponse(error: z.ZodError): AuthResponse {
    const fieldErrors = error.errors
      .map((err) => `${err.path}: ${err.message}`)
      .join(', ')

    return {
      success: false,
      error: `Помилка валідації: ${fieldErrors}`,
    }
  }

  protected createGenericErrorResponse(message: string): AuthResponse {
    return {
      success: false,
      error: message,
    }
  }

  protected createSuccessResponse(): AuthResponse {
    return { success: true }
  }

  abstract validate(request: AuthRequest): AuthResponse | null
}
