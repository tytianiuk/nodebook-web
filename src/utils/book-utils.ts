import { Book, Filters } from '@/types/book'

export const filterBooks = (books: Book[], filters: Filters): Book[] => {
  return books.filter((book) => {
    return (
      (book.name.toLowerCase().includes(filters.search?.toLowerCase() ?? '') ||
        book.author
          .toLowerCase()
          .includes(filters.search?.toLowerCase() ?? '')) &&
      book.genres.toLowerCase().includes(filters.genre?.toLowerCase() ?? '') &&
      book.rating >= (filters.minRating ?? 0)
    )
  })
}
