'use client'

import { Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

import BooksAPI from '@/api/books-api'
import BookInfo from '@/app/[bookId]/components/book-info'
import BookLikeButton from '@/app/[bookId]/components/book-like-button'
import BookOpinionTabs from '@/app/[bookId]/components/book-opinion-tabs'
import type { Book } from '@/types/book'

interface BookProps {
  params: { bookId: string }
}

const Book = ({ params }: BookProps) => {
  const [book, setBook] = useState<Book | null>(null)

  const fetchBook = async () => {
    try {
      const fetchedBook = await BooksAPI.getBookById(params.bookId)
      setBook(fetchedBook.data as Book)
    } catch {
      setBook(null)
    }
  }

  useEffect(() => {
    fetchBook()
  }, [params.bookId])

  if (!book) {
    return (
      <div className='flex flex-col items-center justify-center h-[600px] text-center  '>
        <Loader2 className=' self-center w-12 h-12 animate-spin text-gray-300' />
        <span className='text-2xl text-gray-300 font-bold mb-2'>
          Завантаження...
        </span>
        <span className='text-2xl text-gray-300 font-bold mb-2'>
          Можливо, книга була видалена або її не існує
        </span>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <div className='max-w-screen-xl mx-auto bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden'>
        <BookInfo book={book} />
        <div className='p-1'>
          <BookLikeButton book={book} />
        </div>
        <div className='p-8 bg-card'>
          <BookOpinionTabs book={book} updateBook={fetchBook} />
        </div>
      </div>
    </div>
  )
}

export default Book
