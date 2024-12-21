import { describe, it, expect } from '@jest/globals'

import { Book, Filters } from '@/types/book'
import { filterBooks } from '@/utils/book-utils'

const books: Book[] = [
  {
    id: 1,
    name: 'Книга 1',
    genres: 'Художня література',
    rating: 4,
    author: 'Автор 1',
    releaseDate: new Date().toDateString(),
    comments: [],
  },
  {
    id: 2,
    name: 'Книга 2',
    genres: 'Наукова фантастика',
    rating: 5,
    author: 'Автор 2',
    releaseDate: new Date().toDateString(),
    comments: [],
  },
  {
    id: 3,
    name: 'Книга 3',
    genres: 'Художня література',
    rating: 3,
    author: 'Автор 3',
    releaseDate: new Date().toDateString(),
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

    it('should filter books by genre', () => {
      const filters: Filters = { genre: 'Художня література' }
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

    it('should combine filters (genre and rating)', () => {
      const filters: Filters = {
        genre: 'Художня література',
        minRating: 4,
      }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual([books[0]])
    })

    it('should handle undefined filter values', () => {
      const filters: Filters = {
        search: undefined,
        genre: undefined,
        minRating: undefined,
      }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual(books)
    })

    it('should handle empty strings in filters', () => {
      const filters: Filters = { search: '', genre: '', minRating: 0 }
      const filteredBooks = filterBooks(books, filters)
      expect(filteredBooks).toEqual(books)
    })
  })
})
