import { api } from 'nodebook-api'

import env from '@/lib/env'

class CategoriesAPI {
  async getAllCategories() {
    return await api.get('/categories', {
      baseURL: env.API_URL,
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoriesAPI()
