import api from '@/lib/api'

class ProfileAPI {
  async logout() {
    return await api.post('/auth/logout')
  }

  async getLikedBooks() {
    return await api.get('/books/liked')
  }

  async changePassword(password: string) {
    return await api.patch('/users/me', {
      body: { password },
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfileAPI()
