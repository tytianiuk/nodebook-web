import React from 'react'

import BookComments from '@/app/[bookId]/components/book-comments'
import { Comment } from '@/types/comment'

interface BookCommentsSectionProps {
  comments: Comment[]
}

const BookCommentsSection = ({
  comments: comments,
}: BookCommentsSectionProps) => {
  return (
    <div className='space-y-4' data-testid='comment'>
      {comments.map((comment) => (
        <BookComments key={comment._id} comment={comment} />
      ))}
    </div>
  )
}

export default BookCommentsSection
