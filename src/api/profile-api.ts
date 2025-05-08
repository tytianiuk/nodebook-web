import { httpClient } from '@/patterns/api/api-adapter'

class ProfileAPI {
  async logout() {
    return await httpClient.post('/auth/logout')
  }

  async getLikedBooks() {
    return await httpClient.get('/books/liked')
  }

  async changePassword(password: string) {
    return await httpClient.patch('/users/me', {
      body: { password },
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfileAPI()
