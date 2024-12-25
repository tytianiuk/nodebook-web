'use client'

import React from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Comment } from '@/types/comment'
import { getNameAbbreviation } from '@/utils/user-utils'

interface BookCommentsProps {
  comment: Comment
}

const BookComments = ({ comment: comment }: BookCommentsProps) => {
  return (
    <Card className='bg-card text-card-foreground'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Avatar>
              <AvatarFallback>
                {getNameAbbreviation(comment.userId.username)}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{comment.userId.username}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{comment.comment}</p>
      </CardContent>
    </Card>
  )
}

export default BookComments
