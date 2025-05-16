import { BaseApi } from './base-api'

import type { ApiResponse } from '@/lib/http-client'
import type { Book, Filters } from '@/types/book'

class BooksAPI extends BaseApi<BooksAPI> {
  constructor(constructorToken?: symbol) {
    super(constructorToken)
  }

  async getAllBooks(filters?: Filters): Promise<ApiResponse<Book[]>> {
    const params = Object.entries(filters || {})
      .filter(([, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    return await this.client.get<Book[]>('/books', { params })
  }

  async getBookById(bookId: string): Promise<ApiResponse<Book>> {
    return await this.client.get<Book>(`/books/${bookId}`)
  }

  async addReview(
    bookId: string,
    review: { comment: string; rating: number },
  ): Promise<ApiResponse<unknown>> {
    return await this.client.post(`/books/${bookId}/review`, {
      body: review,
    })
  }

  async addComment(
    bookId: string,
    comment: string,
  ): Promise<ApiResponse<unknown>> {
    return await this.client.post(`/books/${bookId}/comment`, {
      body: { comment },
    })
  }

  async likeBookById(bookId: string): Promise<ApiResponse<unknown>> {
    return await this.client.post(`/books/${bookId}/like`)
  }

  async dislikeBookById(bookId: string): Promise<ApiResponse<unknown>> {
    return await this.client.post(`/books/${bookId}/dislike`)
  }

  async getBooksLiked(): Promise<ApiResponse<Book[]>> {
    return await this.client.get<Book[]>('/books/liked')
  }
}

export default BooksAPI.getInstance()
