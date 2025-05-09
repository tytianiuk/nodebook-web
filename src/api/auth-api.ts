import { BaseApi } from './base-api'

import type { ApiResponse } from '@/lib/http-client'
import type { User } from '@/types/user'

class AuthAPI extends BaseApi<AuthAPI> {
  constructor(constructorToken?: symbol) {
    super(constructorToken)
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<ApiResponse<User>> {
    return await this.client.post<User>('/auth/signup', {
      body: { username, email, password },
    })
  }

  async login(
    email: string,
    password: string,
  ): Promise<ApiResponse<{ token: string; user: User }>> {
    return await this.client.post<{ token: string; user: User }>(
      '/auth/login',
      {
        body: { email, password },
      },
    )
  }

  async getMe(): Promise<ApiResponse<User>> {
    return await this.client.get<User>('/users/me')
  }
}

export default AuthAPI.getInstance()
