'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { BookX } from 'lucide-react'

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

  return (
    <div className='md:col-span-3 overflow-y-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 '>
        {books.length === 0 ? (
          <div className='col-span-3 flex flex-col items-center justify-center text-center h-[400px]'>
            <BookX className='w-24 h-24 text-gray-400 mb-4' />
            <h2 className='text-2xl font-bold mb-2'>Книг не знайдено</h2>
            <span className='text-gray-600 mb-6 max-w-xl'>
              На жаль, за вашим запитом не знайдено жодної книги. Спробуйте
              змінити параметри пошуку або перегляньте наш повний каталог.
            </span>
          </div>
        ) : (
          books.map((book) => <BookCard book={book} key={book._id} />)
        )}
      </div>
    </div>
  )
}

export default BooksList
