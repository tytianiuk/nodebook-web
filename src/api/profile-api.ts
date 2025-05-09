import { BaseApi } from './base-api'

import type { ApiResponse } from '@/lib/http-client'
import type { Book } from '@/types/book'

class ProfileAPI extends BaseApi<ProfileAPI> {
  constructor(constructorToken?: symbol) {
    super(constructorToken)
  }

  async logout(): Promise<ApiResponse<unknown>> {
    return await this.client.post('/auth/logout')
  }

  async getLikedBooks(): Promise<ApiResponse<Book[]>> {
    return await this.client.get<Book[]>('/books/liked')
  }

  async changePassword(password: string): Promise<ApiResponse<unknown>> {
    return await this.client.patch('/users/me', {
      body: { password },
    })
  }
}

export default ProfileAPI.getInstance()
