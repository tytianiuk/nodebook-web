import { render, screen } from '@testing-library/react'
import React from 'react'

import BookCommentsSection from '@/app/[bookId]/components/book-comments-section'

const mockComments = [
  {
    _id: '1',
    userId: { _id: '1', email: 'email1@e.com', username: 'User1' },
    comment: 'Comment 1',
  },
  {
    _id: '2',
    userId: { _id: '2', email: 'email2@e.com', username: 'User2' },
    comment: 'Comment 2',
  },
]

describe('BookCommentsSection', () => {
  it('renders all comments', () => {
    render(<BookCommentsSection comments={mockComments} />)
    expect(screen.getByText('Comment 1')).toBeInTheDocument()
    expect(screen.getByText('Comment 2')).toBeInTheDocument()
  })

  it('renders correct number of comments section', () => {
    render(<BookCommentsSection comments={mockComments} />)
    const commentElements = screen.getAllByTestId('comment')
    expect(commentElements).toHaveLength(1)
  })
})
