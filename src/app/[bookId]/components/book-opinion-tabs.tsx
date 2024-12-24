'use client'

import { useState } from 'react'

import BookCommentsForm from '@/app/[bookId]/components/book-comments-form'
import BookCommentsSection from '@/app/[bookId]/components/book-comments-section'
import BookReviewForm from '@/app/[bookId]/components/book-review-form'
import BookReviewSection from '@/app/[bookId]/components/book-review-section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Book } from '@/types/book'

interface BookOpinionTabs {
  book: Book
}

const BookOpinionTabs = ({
  book,
  updateBook,
}: BookOpinionTabs & { updateBook: () => void }) => {
  const [activeTab, setActiveTab] = useState('reviews')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='reviews' data-testid='reviews'>
          <h2 className='font-bold text-primary'>Відгуки</h2>
        </TabsTrigger>
        <TabsTrigger value='comments' data-testid='comments'>
          <h2 className='font-bold text-primary'>Коментарі</h2>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='reviews'>
        <h2 className='text-2xl font-bold text-primary mb-4'>Відгуки</h2>
        <BookReviewForm bookId={book._id} updateBook={updateBook} />
        {book.reviews && book.reviews.length > 0 ? (
          <BookReviewSection reviews={book.reviews} />
        ) : (
          <p data-testid='no-reviews'>Відгуків немає</p>
        )}
      </TabsContent>
      <TabsContent value='comments'>
        <h2 className='text-2xl font-bold text-primary mb-4'>Коментарі</h2>
        <BookCommentsForm bookId={book._id} updateBook={updateBook} />
        {book.comments && book.comments.length > 0 ? (
          <BookCommentsSection comments={book.comments} />
        ) : (
          <p data-testid='no-comments'>Коментарів немає</p>
        )}
      </TabsContent>
    </Tabs>
  )
}

export default BookOpinionTabs
