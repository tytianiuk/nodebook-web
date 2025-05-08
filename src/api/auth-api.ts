import { httpClient } from '@/patterns/api/api-adapter'

class AuthAPI {
  async register(username: string, email: string, password: string) {
    return await httpClient.post('/auth/signup', {
      body: { username, email, password },
    })
  }

  async login(email: string, password: string) {
    return await httpClient.post('/auth/login', {
      body: { email, password },
    })
  }

  async getMe() {
    return await httpClient.get('/users/me')
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthAPI()
