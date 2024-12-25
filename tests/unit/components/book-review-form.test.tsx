import { render, screen, fireEvent } from '@testing-library/react'

import BookReviewForm from '@/app/[bookId]/components/book-review-form'
import useUserStore from '@/hooks/store/use-user-store'

jest.mock('@/hooks/store/use-user-store', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@/api/books-api')

const mockUpdateBook = jest.fn()

describe('BookReviewForm', () => {
  beforeEach(() => {
    ;(useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue(
      {
        user: { _id: '123', username: 'testuser' },
      },
    )
  })

  it('renders form correctly', () => {
    render(<BookReviewForm bookId='book1' updateBook={mockUpdateBook} />)

    expect(screen.getByTestId('review-form')).toBeInTheDocument()
    expect(screen.getByText('Додати відгук')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /[1-5]/ })).toHaveLength(5)
  })

  it('disables submit button when form is empty', () => {
    render(<BookReviewForm bookId='book1' updateBook={mockUpdateBook} />)

    expect(screen.getByText('Додати відгук')).toBeDisabled()
  })

  it('enables submit button when form is filled', () => {
    render(<BookReviewForm bookId='book1' updateBook={mockUpdateBook} />)

    fireEvent.change(screen.getByTestId('review-form'), {
      target: { value: 'Test review' },
    })
    fireEvent.click(screen.getByTestId('rating-3'))

    expect(screen.getByText('Додати відгук')).toBeEnabled()
  })
})
