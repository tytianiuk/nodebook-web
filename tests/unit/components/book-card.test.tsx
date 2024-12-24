import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import BookCard from '@/app/catalog/components/book-card'
import { Book } from '@/types/book'
import { Category } from '@/types/categories'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('BookCard Component', () => {
  const category: Category = { _id: '1', name: 'Художня література' }

  const book: Book = {
    _id: '1',
    name: 'Тестова Книга',
    pageQuantity: 1,
    author: 'Тестовий Автор',
    categoryId: category,
    averageRating: 4.5,
    reviews: [],
    comments: [],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render book details correctly', () => {
    render(<BookCard book={book} />)

    expect(screen.getByTestId('title')).toHaveTextContent('Тестова Книга')
    expect(screen.getByText('Тестовий Автор')).toBeInTheDocument()
    expect(screen.getByTestId('category')).toHaveTextContent(
      'Художня література',
    )
    expect(screen.getByTestId('rating')).toHaveTextContent('4.5')

    const image = screen.getByAltText('Тестова Книга')
    expect(image).toBeInTheDocument()
  })

  it('should render image with correct src', () => {
    render(<BookCard book={book} />)

    const image = screen.getByAltText('Тестова Книга')
    expect(image).toHaveAttribute('src')
  })

  it('should render the correct number of filled and empty stars in the rating', () => {
    render(<BookCard book={book} />)

    const filledStars = screen.getAllByTestId('filled-star')
    const emptyStars = screen.getAllByTestId('empty-star')

    expect(filledStars).toHaveLength(4)
    expect(emptyStars).toHaveLength(1)
  })

  it('should navigate to book details page when "Детальніше" button is clicked', async () => {
    const push = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push })

    render(<BookCard book={book} />)

    const detailsLink = screen.getByRole('link', { name: /Детальніше/i })
    expect(detailsLink).toHaveAttribute('href', `/${book._id}`)
  })
})
