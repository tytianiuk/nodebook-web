import { catalog } from '@/mock/data/books'
import { Book } from '@/types/book'

class MockCatalogAPI {
  async getCatalog(): Promise<{ data: Book[] }> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: catalog }), 500)
    })
  }
}

const mockCatalogAPIInstance = new MockCatalogAPI()

export default mockCatalogAPIInstance
