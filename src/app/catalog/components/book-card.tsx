'use client'

import Image from 'next/image'
import Link from 'next/link'

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

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card key={book._id}>
      <Image
        src='https://placehold.co/600x400'
        alt={book.name}
        width={600}
        height={400}
        className='rounded-t-lg w-full object-cover'
        loading='lazy'
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvXJ1PQAGxwIvhCi3BQAAAABJRU5ErkJggg=='
      />
      <CardHeader>
        <CardTitle data-testid='title'>{book.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-500'>{book.author}</p>
        <p className='text-sm text-gray-500' data-testid='category'>
          {book.categoryId.name}
        </p>
        <BookRating rating={book.averageRating} />
      </CardContent>
      <CardFooter className='flex gap-2 flex-wrap'>
        <Link href={`/${book._id}`}>
          <Button>Детальніше</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BookCard
