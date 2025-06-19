import type { User } from '../types/user'

import type { AuthResponse } from '@/patterns/chain-of-responsibility/auth-types'

export class AuthResponseHelper {
  static success(user: User, data?: Record<string, unknown>): AuthResponse {
    return {
      success: true,
      user,
      ...(data && { data }),
    }
  }

  static error(message: string): AuthResponse {
    return {
      success: false,
      error: message,
    }
  }

  static validationError(fieldErrors: string): AuthResponse {
    return {
      success: false,
      error: `Помилка валідації: ${fieldErrors}`,
    }
  }
}
