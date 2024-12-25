import api from '@/lib/api'

class BooksAPI {
  async getAllBooks() {
    return await api.get('/books')
  }

  async getBookById(bookId: string) {
    return await api.get(`/books/${bookId}`)
  }

  async addReview(bookId: string, review: { comment: string; rating: number }) {
    return await api.post(`/books/${bookId}/review`, {
      body: { review },
    })
  }

  async addComment(bookId: string, comment: string) {
    return await api.post(`/books/${bookId}/comment`, {
      body: { comment },
    })
  }

  async likeBookById(bookId: string) {
    return await api.post(`/books/${bookId}/like`)
  }

  async dislikeBookById(bookId: string) {
    return await api.post(`/books/${bookId}/dislike`)
  }

  async getBooksLiked() {
    return await api.get('/books/liked')
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BooksAPI()
