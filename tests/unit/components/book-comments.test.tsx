import { render, screen } from '@testing-library/react'

import BookComments from '@/app/[bookId]/components/book-comments'

const mockComment = {
  _id: '1',
  userId: { _id: 'user1', email: 'email1@e.com', username: 'Test User' },
  comment: 'This is a test comment',
}

describe('BookComments', () => {
  it('renders comment correctly', () => {
    render(<BookComments comment={mockComment} />)

    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('This is a test comment')).toBeInTheDocument()
  })

  it('renders user avatar fallback correctly', () => {
    render(<BookComments comment={mockComment} />)

    expect(screen.getByText('TU')).toBeInTheDocument()
  })
})
