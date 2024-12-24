import { describe, it, expect } from '@jest/globals'

import { Book, Filters } from '@/types/book'
import { Category } from '@/types/categories'
import { filterBooks } from '@/utils/book-utils'

const categories: Category[] = [
  { _id: '1', name: 'Пригоди' },
  { _id: '2', name: 'Фентезі' },
  { _id: '3', name: 'Художня література' },
]

const books: Book[] = [
  {
    _id: '1',
    name: 'Книга 1',
    pageQuantity: 1,
    author: 'Автор 1',
    categoryId: categories[2],
    averageRating: 4,
    reviews: [],
    comments: [],
  },
  {
    _id: '2',
    name: 'Книга 2',
    pageQuantity: 2,
    author: 'Автор 2',
    categoryId: categories[0],
    averageRating: 5,
    reviews: [],
    comments: [],
  },
  {
    _id: '3',
    name: 'Книга 3',
    pageQuantity: 3,
    author: 'Автор 3',
    categoryId: categories[2],
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
      const filters: Filters = { category: '3' }
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
        category: '3',
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
