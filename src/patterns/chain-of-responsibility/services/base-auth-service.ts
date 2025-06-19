import type { AuthResponse } from '../auth-types'

import AuthAPI from '@/api/auth-api'
import type { User } from '@/types/user'

export abstract class BaseAuthService {
  protected async getUserProfile(): Promise<User> {
    const response = await AuthAPI.getMe()
    return response.data
  }

  protected createSuccessResponse<TData = Record<string, unknown>>(
    user: User,
    data?: TData,
  ): AuthResponse {
    return {
      success: true,
      user,
      ...(data && { data }),
    }
  }

  protected createErrorResponse(error: string): AuthResponse {
    return {
      success: false,
      error,
    }
  }
}
