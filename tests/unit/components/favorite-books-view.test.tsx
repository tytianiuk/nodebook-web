import { render, screen } from '@testing-library/react'

import FavoriteBooksView from '@/app/profile/components/presentational/favorite-books-view'
import { Accordion } from '@/components/ui/accordion'
import { Book } from '@/types/book'

jest.mock('@/app/catalog/components/book-card', () => ({
  __esModule: true,
  default: ({ book }: { book: Book }) => (
    <div data-testid='book-card'>{book.name}</div>
  ),
}))

const mockBooks = [
  {
    _id: '1',
    name: 'Favorite Book 1',
    pageQuantity: 100,
    author: 'Author 1',
    categoryId: { _id: '1', name: 'Category 1' },
    averageRating: 4,
    comments: [],
    reviews: [],
  },
  {
    _id: '2',
    name: 'Favorite Book 2',
    pageQuantity: 200,
    author: 'Author 2',
    categoryId: { _id: '2', name: 'Category 2' },
    averageRating: 5,
    comments: [],
    reviews: [],
  },
]

describe('FavoriteBooksView', () => {
  it('renders loading state correctly', () => {
    render(
      <Accordion type='single'>
        <FavoriteBooksView favoriteBooks={[]} isLoading={true} />
      </Accordion>,
    )
    expect(screen.getByRole('loading')).toBeInTheDocument()
  })

  it('renders empty state correctly', () => {
    render(
      <Accordion type='single'>
        <FavoriteBooksView favoriteBooks={[]} isLoading={false} />
      </Accordion>,
    )

    expect(screen.getByRole('no-books')).toBeInTheDocument()
  })

  it('renders books correctly', () => {
    render(
      <Accordion type='single'>
        <FavoriteBooksView favoriteBooks={mockBooks} isLoading={false} />
      </Accordion>,
    )

    expect(screen.getByText('Favorite Book 1')).toBeInTheDocument()
    expect(screen.getByText('Favorite Book 2')).toBeInTheDocument()
    expect(screen.getAllByTestId('book-card')).toHaveLength(2)
  })
})
