'use client'

import { ThumbsUp, ThumbsDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'

import BooksAPI from '@/api/books-api'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import useUserStore from '@/hooks/store/use-user-store'
import { Book } from '@/types/book'

interface BookLikeButtonProps {
  book: Book
}

const BookLikeButton = ({ book }: BookLikeButtonProps) => {
  const { user } = useUserStore()
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user) {
        const response = await BooksAPI.getBooksLiked()
        const likedBooks = response.data as Book[]
        setIsLiked(
          likedBooks.some((likedBook: Book) => likedBook._id === book._id),
        )
      }
    }
    checkIfLiked()
  }, [user, book._id])

  const handleLikeToggle = async () => {
    if (isLiked) {
      await BooksAPI.dislikeBookById(book._id)
    } else {
      await BooksAPI.likeBookById(book._id)
    }
    setIsLiked(!isLiked)
  }

  if (!user) return null

  return (
    <CardFooter className='flex justify-start mt-5 p-0 px-6'>
      <Button
        variant='outline'
        size='sm'
        onClick={handleLikeToggle}
        className={`text-primary hover:bg-primary hover:text-primary-foreground ${
          isLiked ? 'bg-red-600 text-primary-foreground hover:bg-red-800' : ''
        }`}
      >
        {isLiked ? (
          <ThumbsDown className='h-4 w-4 mr-1' />
        ) : (
          <ThumbsUp className='h-4 w-4 mr-1' />
        )}
        {isLiked ? 'Прибрати вподобайку' : 'Поставити вподобайку'}
      </Button>
    </CardFooter>
  )
}

export default BookLikeButton
