'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { Book } from '@/types/book'

interface BookInfoProps {
  book: Book
}

const BookInfo = ({ book }: BookInfoProps) => {
  return (
    <div>
      <div className='md:flex'>
        <div className='md:flex-shrink-0'>
          <Image
            className='h-full min-w-72 w-full object-cover md:w-48'
            src={'https://placehold.co/600x400'}
            alt={book.name}
            width={100}
            height={100}
          />
        </div>
        <div className='p-8'>
          {book.categoryId.name && (
            <div className='uppercase tracking-wide text-sm text-primary font-semibold'>
              {book.categoryId.name}
            </div>
          )}
          <h1
            className='mt-1 text-4xl font-bold text-primary'
            data-testid='book-name'
          >
            {book.name}
          </h1>
          <p className='mt-2 text-muted-foreground' data-testid='book-author'>
            від {book.author}
          </p>
          {(book.averageRating || typeof book.averageRating === 'number') && (
            <div className='mt-4 flex items-center'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(book.averageRating as number)
                      ? 'text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                  data-testid={`${
                    i < Math.floor(book.averageRating as number)
                      ? 'filled-star'
                      : 'empty-star'
                  }`}
                />
              ))}
              <span className='ml-2 text-muted-foreground'>
                {book.averageRating.toFixed(1)}
              </span>
            </div>
          )}
          <p className='mt-4 text-xl font-bold text-primary'>
            {book.pageQuantity} сторінок
          </p>
          {book.description && (
            <p
              className='mt-2 text-muted-foreground'
              data-testid='book-description'
            >
              {book.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookInfo
