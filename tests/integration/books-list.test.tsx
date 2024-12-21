import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'

import BooksList from '@/app/catalog/components/books-list'
import '@testing-library/jest-dom'
import { Book, Filters } from '@/types/book'

jest.mock('@tanstack/react-query', () => ({
  useSuspenseQuery: jest.fn(),
}))

jest.mock('@/app/catalog/components/book-card', () => ({
  __esModule: true,
  default: ({ book }: { book: Book }) => <div>{book.name}</div>,
}))

describe('BooksList', () => {
  const mockBooks = [
    {
      id: 1,
      name: 'Книга 1',
      genres: 'Художня література',
      rating: 4,
      author: 'Автор 1',
    },
    {
      id: 2,
      name: 'Книга 2',
      genres: 'Наукова фантастика',
      rating: 5,
      author: 'Автор 2',
    },
    {
      id: 3,
      name: 'Книга 3',
      genres: 'Художня література',
      rating: 3.5,
      author: 'Автор 3',
    },
  ]

  const filters: Filters = { search: 'Книга', genre: '', minRating: 0 }

  beforeEach(() => {
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: mockBooks,
    })
  })

  it('should render a list of books', async () => {
    render(<BooksList filters={filters} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.getByText('Книга 2')).toBeInTheDocument()
      expect(screen.getByText('Книга 3')).toBeInTheDocument()
    })
  })

  it('should render the "no books found" message when no books match the filters', async () => {
    const noResultsFilters: Filters = {
      search: 'Nonexistent',
      genre: '',
      minRating: 0,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({ data: [] })

    render(<BooksList filters={noResultsFilters} />)

    await waitFor(() => {
      expect(screen.getByText('Книг не знайдено')).toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (name)', async () => {
    const searchFilter: Filters = { search: 'Книга 1', genre: '', minRating: 0 }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).toBeNull()
      expect(screen.queryByText('Книга 3')).toBeNull()
    })
  })

  it('should display filtered books based on the provided filters (author)', async () => {
    const searchFilter: Filters = { search: 'Автор 2', genre: '', minRating: 0 }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[1]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.queryByText('Книга 1')).toBeNull()
      expect(screen.getByText('Книга 2')).toBeInTheDocument()
      expect(screen.queryByText('Книга 3')).toBeNull()
    })
  })

  it('should display filtered books based on the provided filters (genre)', async () => {
    const searchFilter: Filters = {
      search: '',
      genre: 'Художня література',
      minRating: 0,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0], mockBooks[2]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).toBeNull()
      expect(screen.getByText('Книга 3')).toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (minRating)', async () => {
    const searchFilter: Filters = {
      search: '',
      genre: '',
      minRating: 4,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0], mockBooks[1]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.getByText('Книга 2')).toBeInTheDocument()
      expect(screen.queryByText('Книга 3')).toBeNull()
    })
  })

  it('should display filtered books based on the provided filters (genre & minRating)', async () => {
    const searchFilter: Filters = {
      search: '',
      genre: 'Художня література',
      minRating: 4,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).toBeNull()
      expect(screen.queryByText('Книга 3')).toBeNull()
    })
  })

  it('should display filtered books based on the provided filters (all)', async () => {
    const searchFilter: Filters = {
      search: '3',
      genre: 'Художня література',
      minRating: 3,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[2]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.queryByText('Книга 1')).toBeNull()
      expect(screen.queryByText('Книга 2')).toBeNull()
      expect(screen.getByText('Книга 3')).toBeInTheDocument()
    })
  })

  it('should handle loading state if books data is not available', async () => {
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: null,
    })

    render(<BooksList filters={filters} />)

    await waitFor(() => {
      expect(screen.getByText('Книг не знайдено')).toBeInTheDocument()
    })
  })
})
