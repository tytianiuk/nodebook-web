'use client'

import { HeartCrack } from 'lucide-react'
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
        {!favoriteBooks || favoriteBooks.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-10 text-center text-gray-500'>
            <HeartCrack className='w-12 h-12 mb-4' />
            <p className='text-lg font-medium'>
              У вас поки немає вподобаних книг.
            </p>
            <p className='text-sm'>
              Перейдіть до каталогу, щоб додати книги у список вподобань.
            </p>
          </div>
        ) : (
          <div className='max-h-[calc(100vh-320px)]  overflow-y-auto pr-4'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              {favoriteBooks.map((book, index) => (
                <div className='h-4/5' key={index}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

export default FavoriteBooks
