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

  const filters: Filters = { search: 'Книга', category: '', minRating: 0 }

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
    const searchFilter: Filters = {
      search: 'Книга 1',
      category: '',
      minRating: 0,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Книга 3')).not.toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (author)', async () => {
    const searchFilter: Filters = {
      search: 'Автор 2',
      category: '',
      minRating: 0,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[1]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.queryByText('Книга 1')).not.toBeInTheDocument()
      expect(screen.getByText('Книга 2')).toBeInTheDocument()
      expect(screen.queryByText('Книга 3')).not.toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (category)', async () => {
    const searchFilter: Filters = {
      search: '',
      category: 'cat1',
      minRating: 0,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0], mockBooks[2]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).not.toBeInTheDocument()
      expect(screen.getByText('Книга 3')).toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (minRating)', async () => {
    const searchFilter: Filters = {
      search: '',
      category: '',
      minRating: 4,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0], mockBooks[1]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.getByText('Книга 2')).toBeInTheDocument()
      expect(screen.queryByText('Книга 3')).not.toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (category & minRating)', async () => {
    const searchFilter: Filters = {
      search: '',
      category: 'cat1',
      minRating: 4,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[0]],
    })

    render(<BooksList filters={searchFilter} />)

    await waitFor(() => {
      expect(screen.getByText('Книга 1')).toBeInTheDocument()
      expect(screen.queryByText('Книга 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Книга 3')).not.toBeInTheDocument()
    })
  })

  it('should display filtered books based on the provided filters (all)', async () => {
    const searchFilter: Filters = {
      search: '3',
      category: 'cat1',
      minRating: 3,
    }
    ;(useSuspenseQuery as jest.Mock).mockReturnValue({
      data: [mockBooks[2]],
    })

    render(<BooksList filters={searchFilter} />)

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
