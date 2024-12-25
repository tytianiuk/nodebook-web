import { render, screen } from '@testing-library/react'
import React from 'react'

import BookInfo from '@/app/[bookId]/components/book-info'

const mockBook = {
  _id: '1',
  name: 'Test Book',
  author: 'Test Author',
  categoryId: { _id: '1', name: 'Test Category' },
  pageQuantity: 100,
  averageRating: 4,
  description: 'Test description',
  comments: [],
  reviews: [],
}

describe('BookInfo', () => {
  it('renders book information correctly', () => {
    render(<BookInfo book={mockBook} />)
    expect(screen.getByText('Test Category')).toBeInTheDocument()
    expect(screen.getByTestId('book-name')).toHaveTextContent('Test Book')
    expect(screen.getByTestId('book-author')).toHaveTextContent(
      'від Test Author',
    )
    expect(screen.getByText('100 сторінок')).toBeInTheDocument()
    expect(screen.getByTestId('book-description')).toHaveTextContent(
      'Test description',
    )
  })

  it('renders correct number of stars for rating', () => {
    render(<BookInfo book={mockBook} />)

    const filledStars = screen.getAllByTestId('filled-star')
    const unfilledStars = screen.getAllByTestId('empty-star')
    expect(filledStars.length).toBe(4)
    expect(unfilledStars.length).toBe(1)
  })
})
