import { BaseApi } from './base-api'

import type { ApiResponse } from '@/lib/http-client'
import type { Category } from '@/types/categories'

class CategoriesAPI extends BaseApi<CategoriesAPI> {
  constructor(constructorToken?: symbol) {
    super(constructorToken)
  }

  async getAllCategories(): Promise<ApiResponse<Category[]>> {
    return await this.client.get<Category[]>('/categories')
  }
}

export default CategoriesAPI.getInstance()
