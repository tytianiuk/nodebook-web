import { render, screen, fireEvent } from '@testing-library/react'

import BookCommentsForm from '@/app/[bookId]/components/book-comments-form'
import useUserStore from '@/hooks/store/use-user-store'

jest.mock('@/hooks/store/use-user-store', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@/api/books-api')

const mockUpdateBook = jest.fn()

describe('BookCommentsForm', () => {
  beforeEach(() => {
    ;(useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue(
      {
        user: { _id: '123', username: 'testuser' },
      },
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders form correctly', () => {
    render(<BookCommentsForm bookId='book1' updateBook={mockUpdateBook} />)

    expect(
      screen.getByPlaceholderText('Напишіть свій коментар...'),
    ).toBeInTheDocument()
    expect(screen.getByText('Додати коментар')).toBeInTheDocument()
  })

  it('disables submit button when form is empty', () => {
    render(<BookCommentsForm bookId='book1' updateBook={mockUpdateBook} />)

    expect(screen.getByText('Додати коментар')).toBeDisabled()
  })

  it('enables submit button when form is filled', () => {
    render(<BookCommentsForm bookId='book1' updateBook={mockUpdateBook} />)

    fireEvent.change(screen.getByPlaceholderText('Напишіть свій коментар...'), {
      target: { value: 'Test comment' },
    })

    expect(screen.getByText('Додати коментар')).toBeEnabled()
  })
})
