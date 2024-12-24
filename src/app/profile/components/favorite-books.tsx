'use client'

import { useState, useEffect } from 'react'

import profileAPI from '@/api/profile-api'
import BookCard from '@/app/catalog/components/book-card'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Book } from '@/types/book'

const FavoriteBooks = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([])
  useEffect(() => {
    const getFavoriteBooks = async () => {
      try {
        const books = await profileAPI.getLikedBooks()
        setFavoriteBooks(books)
      } catch {}
    }
    getFavoriteBooks()
  }, [])

  return (
    <AccordionItem value='favorite-books' className='px-2'>
      <AccordionTrigger>Вподобані книжки</AccordionTrigger>
      <AccordionContent>
        <div className='max-h-[600px]  overflow-y-auto pr-4'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {favoriteBooks.map((book, index) => (
              <div className='h-4/5' key={index}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default FavoriteBooks
