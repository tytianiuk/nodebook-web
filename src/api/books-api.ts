import { httpClient } from '@/patterns/api/api-adapter'

class BooksAPI {
  async getAllBooks(filters?: {
    name?: string
    author?: string
    minPages?: number
    maxPages?: number
    minRating?: number
    maxRating?: number
  }) {
    const params = Object.entries(filters || {})
      .filter(([, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    return await httpClient.get('/books', { params })
  }

  async getBookById(bookId: string) {
    return await httpClient.get(`/books/${bookId}`)
  }

  async addReview(bookId: string, review: { comment: string; rating: number }) {
    return await httpClient.post(`/books/${bookId}/review`, {
      body: { review },
    })
  }

  async addComment(bookId: string, comment: string) {
    return await httpClient.post(`/books/${bookId}/comment`, {
      body: { comment },
    })
  }

  async likeBookById(bookId: string) {
    return await httpClient.post(`/books/${bookId}/like`)
  }

  async dislikeBookById(bookId: string) {
    return await httpClient.post(`/books/${bookId}/dislike`)
  }

  async getBooksLiked() {
    return await httpClient.get('/books/liked')
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BooksAPI()
