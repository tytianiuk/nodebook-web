import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'

import BooksList from '@/app/catalog/components/books-list'
import '@testing-library/jest-dom'
import type { Book, Filters } from '@/types/book'

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
      _id: '1',
      name: 'Книга 1',
      author: 'Автор 1',
      categoryId: { _id: 'cat1', name: 'Художня література' },
      pageQuantity: 1,
      averageRating: 4,
    },
    {
      _id: '2',
      name: 'Книга 2',
      author: 'Автор 2',
      categoryId: { _id: 'cat2', name: 'Наукова фантастика' },
      pageQuantity: 2,
      averageRating: 5,
    },
    {
      _id: '3',
      name: 'Книга 3',
      author: 'Автор 3',
      categoryId: { _id: 'cat1', name: 'Художня література' },
      pageQuantity: 3,
      averageRating: 3.5,
    },
  ]

  const filters: Filters = {
    name: 'Книга',
    author: '',
    category: '',
    minRating: 0,
  }

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
      name: 'Nonexistent',
      author: '',
      category: '',
      minRating: 0,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({ data: [] })

    render(<BooksList filters={noResultsFilters} />)

    await waitFor(() => {
      expect(screen.getByText('Книг не знайдено')).toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (name)', async () => {
    const nameFilter: Filters = {
      name: 'Книга 1',
      author: '',
      category: '',
      minRating: 0,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0]],
    })

    render(<BooksList filters={nameFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Книга 3')).not.toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (author)', async () => {
    const authorFilter: Filters = {
      name: '',
      author: 'Автор 2',
      category: '',
      minRating: 0,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[1]],
    })

    render(<BooksList filters={authorFilter} />)

    await waitFor(() => {
      expect(screen.queryByText('Книга 1')).not.toBeInTheDocument()
      expect(screen.getByText('Книга 2')).toBeInTheDocument()
      expect(screen.queryByText('Книга 3')).not.toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (category)', async () => {
    const categoryFilter: Filters = {
      name: '',
      author: '',
      category: 'cat1',
      minRating: 0,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0], mockBooks[2]],
    })

    render(<BooksList filters={categoryFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).not.toBeInTheDocument()
      expect(screen.getByText('Книга 3')).toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (minRating)', async () => {
    const ratingFilter: Filters = {
      name: '',
      author: '',
      category: '',
      minRating: 4,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0], mockBooks[1]],
    })

    render(<BooksList filters={ratingFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.getByText('Книга 2')).toBeInTheDocument()
      expect(screen.queryByText('Книга 3')).not.toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (category & minRating)', async () => {
    const combinedFilter: Filters = {
      name: '',
      author: '',
      category: 'cat1',
      minRating: 4,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0]],
    })

    render(<BooksList filters={combinedFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Книга 3')).not.toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (name & author)', async () => {
    const nameAuthorFilter: Filters = {
      name: 'Книга',
      author: 'Автор 3',
      category: '',
      minRating: 0,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[2]],
    })

    render(<BooksList filters={nameAuthorFilter} />)

    await waitFor(() => {
      expect(screen.queryByText('Книга 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).not.toBeInTheDocument()
      expect(screen.getByText('Книга 3')).toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (all)', async () => {
    const allFilters: Filters = {
      name: '3',
      author: '3',
      category: 'cat1',
      minRating: 3,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[2]],
    })

    render(<BooksList filters={allFilters} />)

    await waitFor(() => {
      expect(screen.queryByText('Книга 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).not.toBeInTheDocument()
      expect(screen.getByText('Книга 3')).toBeInTheDocument()
    })
  })

  it('should handle empty book array', async () => {
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [],
    })

    render(<BooksList filters={filters} />)

    await waitFor(() => {
      expect(screen.getByText('Книг не знайдено')).toBeInTheDocument()
    })
  })

  it('should display the "no books found" message with correct text', async () => {
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [],
    })

    render(<BooksList filters={filters} />)

    await waitFor(() => {
      expect(screen.getByText('Книг не знайдено')).toBeInTheDocument()
      expect(
        screen.getByText(
          'На жаль, за вашим запитом не знайдено жодної книги. Спробуйте змінити параметри пошуку або перегляньте наш повний каталог.',
        ),
      ).toBeInTheDocument()
    })
  })
})
