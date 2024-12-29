import { api } from 'nodebook-api'

import env from '@/lib/env'

class BooksAPI {
  async getAllBooks() {
    return await api.get('/books', {
      baseURL: env.API_URL,
    })
  }

  async getBookById(bookId: string) {
    return await api.get(`/books/${bookId}`, {
      baseURL: env.API_URL,
    })
  }

  async addReview(bookId: string, review: { comment: string; rating: number }) {
    return await api.post(`/books/${bookId}/review`, {
      baseURL: env.API_URL,
      body: { review },
    })
  }

  async addComment(bookId: string, comment: string) {
    return await api.post(`/books/${bookId}/comment`, {
      baseURL: env.API_URL,
      body: { comment },
    })
  }

  async likeBookById(bookId: string) {
    return await api.post(`/books/${bookId}/like`, {
      baseURL: env.API_URL,
    })
  }

  async dislikeBookById(bookId: string) {
    return await api.post(`/books/${bookId}/dislike`, {
      baseURL: env.API_URL,
    })
  }

  async getBooksLiked() {
    return await api.get('/books/liked', {
      baseURL: env.API_URL,
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BooksAPI()
