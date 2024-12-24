'use client'

import { useState, useEffect } from 'react'

import BookCard from '@/app/catalog/components/book-card'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { catalog } from '@/mock/data/books'
import { Book } from '@/types/book'

const FavoriteBooks = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([])

  useEffect(() => {
    const getFavoriteBooks = async () => {
      const books = catalog
      setFavoriteBooks(books)
    }
    getFavoriteBooks()
  }, [])

  return (
    <AccordionItem value='favorite-books' className='px-2'>
      <AccordionTrigger>Вподобані книжки</AccordionTrigger>
      <AccordionContent>
        <div className='max-h-[600px] overflow-y-auto pr-4'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {favoriteBooks.map((book) => (
              <BookCard book={book} key={book.id} />
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default FavoriteBooks
