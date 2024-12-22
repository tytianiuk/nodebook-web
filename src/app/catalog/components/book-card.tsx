'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import BookRating from '@/components/book-rating'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Book } from '@/types/book'

interface BookCardProps {
  book: Book
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  return (
    <Card key={book.id}>
      <Image
        src='https://placehold.co/600x400'
        alt={book.name}
        width={600}
        height={400}
        className='rounded-t-lg w-full object-cover'
      />
      <CardHeader>
        <CardTitle data-testid='title'>{book.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-500'>{book.author}</p>
        <p className='text-sm text-gray-500' data-testid='category'>
          {book.category}
        </p>
        <BookRating rating={book.averageRating} />
      </CardContent>
      <CardFooter className='flex gap-2 flex-wrap'>
        <Link href={`/${book.id}`}>
          <Button>Детальніше</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BookCard
