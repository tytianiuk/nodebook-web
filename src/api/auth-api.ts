import { api } from 'nodebook-api'

import env from '@/lib/env'

class AuthAPI {
  async register(username: string, email: string, password: string) {
    return await api.post('/auth/signup', {
      baseURL: env.API_URL,
      body: { username, email, password },
    })
  }

  async login(email: string, password: string) {
    return await api.post('/auth/login', {
      baseURL: env.API_URL,
      body: { email, password },
    })
  }

  async getMe() {
    return await api.get('/users/me', {
      baseURL: env.API_URL,
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthAPI()
