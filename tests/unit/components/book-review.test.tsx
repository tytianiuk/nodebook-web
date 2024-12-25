import { render, screen } from '@testing-library/react'

import BookReview from '@/app/[bookId]/components/book-review'

const mockReview = {
  _id: '1',
  userId: { _id: 'user1', email: 'email1@e.com', username: 'Test User' },
  rating: 4,
  comment: 'This is a test review',
}

describe('BookReview', () => {
  it('renders review correctly', () => {
    render(<BookReview review={mockReview} />)

    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('This is a test review')).toBeInTheDocument()
  })

  it('renders user avatar fallback correctly', () => {
    render(<BookReview review={mockReview} />)

    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('renders correct number of stars', () => {
    render(<BookReview review={mockReview} />)

    const filledStars = screen.getAllByTestId('filled-star')
    const unfilledStars = screen.getAllByTestId('empty-star')
    expect(filledStars.length).toBe(4)
    expect(unfilledStars.length).toBe(1)
  })
})
