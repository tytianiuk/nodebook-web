import api from '@/lib/api'

class CategoriesAPI {
  async getAllCategories() {
    return await api.get('/categories')
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoriesAPI()
