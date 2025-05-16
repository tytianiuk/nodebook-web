'use client'

import { useState, useEffect } from 'react'

import FavoriteBooksView from '../presentational/favorite-books-view'

import profileAPI from '@/api/profile-api'
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import type { Book } from '@/types/book'

const FavoriteBooksContainer = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getFavoriteBooks = async () => {
      try {
        setIsLoading(true)
        const response = await profileAPI.getLikedBooks()
        setFavoriteBooks(response.data as Book[])
      } catch (error) {
        console.error('Failed to fetch favorite books:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getFavoriteBooks()
  }, [])

  return (
    <AccordionItem value='favorite-books' className='px-2'>
      <AccordionTrigger>Вподобані книжки</AccordionTrigger>
      <AccordionContent>
        <FavoriteBooksView
          favoriteBooks={favoriteBooks}
          isLoading={isLoading}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default FavoriteBooksContainer
