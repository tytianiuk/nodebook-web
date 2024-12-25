import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import BooksAPI from '@/api/books-api'
import BookLikeButton from '@/app/[bookId]/components/book-like-button'
import useUserStore from '@/hooks/store/use-user-store'

jest.mock('@/hooks/store/use-user-store', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@/api/books-api', () => ({
  getBooksLiked: jest.fn(),
  likeBookById: jest.fn(),
  dislikeBookById: jest.fn(),
}))

const mockBook = {
  _id: '1',
  name: 'Test Book',
  author: 'Test Author',
  categoryId: { _id: '1', name: 'Test Category' },
  pageQuantity: 100,
  averageRating: 4,
  comments: [],
  reviews: [],
}

jest.mock('@/hooks/store/use-user-store', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('BookLikeButton', () => {
  beforeEach(() => {
    ;(useUserStore as unknown as jest.Mock).mockReturnValue({
      user: { _id: '123', username: 'testuser' },
    })
    ;(BooksAPI.getBooksLiked as jest.Mock).mockResolvedValue([])
  })

  it('renders like button when not liked', async () => {
    render(<BookLikeButton book={mockBook} />)

    await waitFor(() => {
      expect(screen.getByText('Поставити вподобайку')).toBeInTheDocument()
    })
  })

  it('renders unlike button when liked', async () => {
    ;(BooksAPI.getBooksLiked as jest.Mock).mockResolvedValue([mockBook])
    render(<BookLikeButton book={mockBook} />)

    await waitFor(() => {
      expect(screen.getByText('Прибрати вподобайку')).toBeInTheDocument()
    })
  })

  it('toggles like status on click', async () => {
    render(<BookLikeButton book={mockBook} />)

    await waitFor(() => {
      expect(screen.getByText('Поставити вподобайку')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Поставити вподобайку'))

    await waitFor(() => {
      expect(screen.getByText('Прибрати вподобайку')).toBeInTheDocument()
    })
  })

  it('does not render the like button if the user is not logged in', () => {
    ;(useUserStore as unknown as jest.Mock).mockReturnValue({ user: null })
    render(<BookLikeButton book={mockBook} />)

    expect(
      screen.queryByPlaceholderText(/Поставити вподобайку/i),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText(/Прибрати вподобайку/i),
    ).not.toBeInTheDocument()
  })
})
