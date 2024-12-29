import { api } from 'nodebook-api'

import env from '@/lib/env'

class ProfileAPI {
  async logout() {
    return await api.post('/auth/logout', {
      baseURL: env.API_URL,
    })
  }

  async getLikedBooks() {
    return await api.get('/books/liked', {
      baseURL: env.API_URL,
    })
  }

  async changePassword(password: string) {
    return await api.patch('/users/me', {
      baseURL: env.API_URL,
      body: { password },
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfileAPI()
