import React from 'react'

import BookReview from '@/app/[bookId]/components/book-review'
import { Review } from '@/types/review'

interface BookReviewSectionProps {
  reviews: Review[]
}

const BookReviewSection = ({ reviews }: BookReviewSectionProps) => {
  return (
    <div className='space-y-4' data-testid='review'>
      {reviews.map((review) => (
        <BookReview key={review._id} review={review} />
      ))}
    </div>
  )
}

export default BookReviewSection
