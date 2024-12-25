import api from '@/lib/api'

class AuthAPI {
  async register(username: string, email: string, password: string) {
    return await api.post('/auth/signup', {
      body: { username, email, password },
    })
  }

  async login(email: string, password: string) {
    return await api.post('/auth/login', {
      body: { email, password },
    })
  }

  async getMe() {
    return await api.get('/users/me')
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthAPI()
