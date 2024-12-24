'use client'
import { useSuspenseQuery } from '@tanstack/react-query'

import BooksAPI from '@/api/books-api'
import BookCard from '@/app/catalog/components/book-card'
import { Book, Filters } from '@/types/book'
import { filterBooks } from '@/utils/book-utils'

interface BooksListProps {
  filters: Filters
}

const BooksList = ({ filters }: BooksListProps) => {
  const { data: books = [] } = useSuspenseQuery<Book[]>({
    queryKey: ['catalog', filters],
    queryFn: async () => {
      const data = await BooksAPI.getAllBooks()
      return filterBooks(data, filters)
    },
  })

  if (books.length === 0) {
    return <p className='text-lg font-medium'>Книг не знайдено</p>
  }

  return (
    <div className='md:col-span-3'>
      <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6'>
        {books.map((book) => (
          <BookCard book={book} key={book._id} />
        ))}
      </div>
    </div>
  )
}

export default BooksList
