import { render, screen } from '@testing-library/react'

import BookOpinionTabs from '@/app/[bookId]/components/book-opinion-tabs'

const mockBook = {
  _id: 'book1',
  name: 'Test Book',
  author: 'Test Author',
  categoryId: { _id: '1', name: 'Test Category' },
  pageQuantity: 100,
  averageRating: 4,
  reviews: [
    {
      _id: 'review1',
      userId: { _id: 'user1', email: 'email1@e.com', username: 'User 1' },
      rating: 4,
      comment: 'Great book!',
    },
  ],
  comments: [
    {
      _id: 'comment1',
      userId: { _id: 'user2', email: 'email1@e.com', username: 'User 2' },
      comment: 'Nice read!',
    },
  ],
}

const mockUpdateBook = jest.fn()

describe('BookOpinionTabs', () => {
  it('renders tabs correctly', () => {
    render(<BookOpinionTabs book={mockBook} updateBook={mockUpdateBook} />)

    expect(screen.getByTestId('reviews')).toBeInTheDocument()
    expect(screen.getByTestId('comments')).toBeInTheDocument()
  })

  it('shows reviews by default', () => {
    render(<BookOpinionTabs book={mockBook} updateBook={mockUpdateBook} />)

    expect(screen.getByText('Great book!')).toBeInTheDocument()
    expect(screen.queryByText('Nice read!')).not.toBeInTheDocument()
  })

  it('shows no reviews if there is no reviews', () => {
    render(
      <BookOpinionTabs
        book={{
          _id: 'book1',
          name: 'Test Book',
          author: 'Test Author',
          categoryId: { _id: '1', name: 'Test Category' },
          pageQuantity: 100,
          averageRating: 4,
          reviews: [],
          comments: [],
        }}
        updateBook={mockUpdateBook}
      />,
    )

    expect(screen.getByTestId('no-reviews')).toBeInTheDocument()
  })

  it('renders the tabs with correct accessibility attributes', () => {
    render(<BookOpinionTabs book={mockBook} updateBook={mockUpdateBook} />)

    const tabList = screen.getByRole('tablist')
    expect(tabList).toBeInTheDocument()
  })
})
