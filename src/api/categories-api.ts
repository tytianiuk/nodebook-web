import { httpClient } from '@/patterns/api/api-adapter'

class CategoriesAPI {
  async getAllCategories() {
    return await httpClient.get('/categories')
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoriesAPI()
