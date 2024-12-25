'use client'
import { Star } from 'lucide-react'
import React from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Review } from '@/types/review'
import { getNameAbbreviation } from '@/utils/user-utils'

interface BookReviewProps {
  review: Review
}

const BookReview = ({ review }: BookReviewProps) => {
  return (
    <Card className='bg-card text-card-foreground'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Avatar>
              <AvatarFallback>
                {getNameAbbreviation(review.userId.username)}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{review.userId.username}</CardTitle>
          </div>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                aria-label='Star'
                className={`h-4 w-4 ${
                  i < review.rating
                    ? 'text-yellow-400'
                    : 'text-muted-foreground'
                }`}
                data-testid={`${
                  i < review.rating ? 'filled-star' : 'empty-star'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{review.comment}</p>
      </CardContent>
    </Card>
  )
}

export default BookReview
