import { render, screen } from '@testing-library/react'
import React from 'react'

import BooksFilters from '@/app/catalog/components/book-filters'

jest.mock('@/app/catalog/components/book-genre-selector', () => {
  const Mock = () => (
    <div data-testid='books-genre-selector'>BooksGenreSelector Mock</div>
  )
  Mock.displayName = 'BooksGenreSelector'
  return Mock
})
jest.mock('@/app/catalog/components/books-rating-select', () => {
  const Mock = () => (
    <div data-testid='books-rating-select'>BooksRatingSelect Mock</div>
  )
  Mock.displayName = 'BooksRatingSelect'
  return Mock
})
jest.mock('@/app/catalog/components/books-search', () => {
  const Mock = () => <div data-testid='books-search'>BooksSearch Mock</div>
  Mock.displayName = 'BooksSearch'
  return Mock
})

describe('BooksFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = render(<BooksFilters />)
    expect(container).toBeInTheDocument()
  })

  it('contains a header with the correct text', () => {
    render(<BooksFilters />)
    const header = screen.getByRole('heading', { level: 2, name: 'Фільтри' })
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Фільтри')
  })

  it('ensures the layout is responsive', () => {
    render(<BooksFilters />)
    const container = screen.getByRole('heading', { name: 'Фільтри' })
    expect(container).toHaveClass('text-xl font-semibold mb-4')
  })

  it('renders BooksSearch component', () => {
    render(<BooksFilters />)
    const booksSearch = screen.getByTestId('books-search')
    expect(booksSearch).toBeInTheDocument()
    expect(booksSearch).toHaveTextContent('BooksSearch Mock')
  })

  it('renders BooksGenreSelector component', () => {
    render(<BooksFilters />)
    const booksGenreSelector = screen.getByTestId('books-genre-selector')
    expect(booksGenreSelector).toBeInTheDocument()
    expect(booksGenreSelector).toHaveTextContent('BooksGenreSelector Mock')
  })

  it('renders BooksRatingSelect component', () => {
    render(<BooksFilters />)
    const booksRatingSelect = screen.getByTestId('books-rating-select')
    expect(booksRatingSelect).toBeInTheDocument()
    expect(booksRatingSelect).toHaveTextContent('BooksRatingSelect Mock')
  })

  it('renders all filters in the correct order', () => {
    render(<BooksFilters />)
    const filtersContainer = screen.getByTestId('filters-container')
    const childElements = Array.from(
      filtersContainer.querySelectorAll('[data-testid]'),
    )

    expect(childElements.map((el) => el.getAttribute('data-testid'))).toEqual([
      'books-search',
      'books-genre-selector',
      'books-rating-select',
    ])
  })

  it('applies default styling to all filters', () => {
    render(<BooksFilters />)
    const filtersContainer = screen.getByTestId('filters-container')
    expect(filtersContainer).toHaveClass('bg-white p-4 rounded-lg shadow')
  })
})
