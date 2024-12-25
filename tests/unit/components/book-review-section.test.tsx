import { render, screen } from '@testing-library/react'

import BookReviewSection from '@/app/[bookId]/components/book-review-section'

const mockReviews = [
  {
    _id: '1',
    userId: { _id: 'user1', email: 'email1@e.com', username: 'User 1' },
    rating: 4,
    comment: 'Great book!',
  },
  {
    _id: '2',
    userId: { _id: 'user2', email: 'email2@e.com', username: 'User 2' },
    rating: 5,
    comment: 'Excellent read!',
  },
]

describe('BookReviewSection', () => {
  it('renders all reviews', () => {
    render(<BookReviewSection reviews={mockReviews} />)

    expect(screen.getByText('Great book!')).toBeInTheDocument()
    expect(screen.getByText('Excellent read!')).toBeInTheDocument()
  })

  it('renders correct number of review section', () => {
    render(<BookReviewSection reviews={mockReviews} />)
    const commentElements = screen.getAllByTestId('review')
    expect(commentElements).toHaveLength(1)
  })
})
