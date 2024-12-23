import { describe, it, expect } from '@jest/globals'

import { Book, Filters } from '@/types/book'
import { filterBooks } from '@/utils/book-utils'

const books: Book[] = [
  {
    id: '1',
    name: 'Книга 1',
    author: 'Автор 1',
    category: 'Художня література',
    pageQuantity: 1,
    averageRating: 4,
    reviews: [],
    comments: [],
  },
  {
    id: '2',
    name: 'Книга 2',
    author: 'Автор 2',
    category: 'Наукова фантастика',
    pageQuantity: 2,
    averageRating: 5,
    reviews: [],
    comments: [],
  },
  {
    id: '3',
    name: 'Книга 3',
    author: 'Автор 3',
    category: 'Художня література',
    pageQuantity: 3,
    averageRating: 3,
    reviews: [],
    comments: [],
  },
]

describe('Books Utils - Unit tests', () => {
  describe('filterBooks', () => {
    it('should filter books by search term (name)', () => {
      const filters: Filters = { search: 'Книга 1' }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual([books[0]])
    })

    it('should filter books by search term (author)', () => {
      const filters: Filters = { search: 'Автор 2' }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual([books[1]])
    })

    it('should filter books by category', () => {
      const filters: Filters = { category: 'Художня література' }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual([books[0], books[2]])
    })

    it('should filter books by minimum rating', () => {
      const filters: Filters = { minRating: 4 }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual([books[0], books[1]])
    })

    it('should handle empty filters', () => {
      const filters: Filters = {}
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual(books)
    })

    it('should handle no matching books', () => {
      const filters: Filters = { search: 'Nonexistent' }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual([])
    })

    it('should filter case-insensitively', () => {
      const filters: Filters = { search: 'КНИГА 1' }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual([books[0]])
    })

    it('should combine filters (category and rating)', () => {
      const filters: Filters = {
        category: 'Художня література',
        minRating: 4,
      }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual([books[0]])
    })

    it('should handle undefined filter values', () => {
      const filters: Filters = {
        search: undefined,
        category: undefined,
        minRating: undefined,
      }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual(books)
    })

    it('should handle empty strings in filters', () => {
      const filters: Filters = { search: '', category: '', minRating: 0 }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual(books)
    })
  })
})
