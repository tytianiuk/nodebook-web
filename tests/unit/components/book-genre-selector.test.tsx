import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useQueryState } from 'nuqs'
import React from 'react'

import '@testing-library/jest-dom'
import BooksGenreSelector from '@/app/catalog/components/book-genre-selector'
import { Genres } from '@/constants/genres'

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}))

describe('BooksGenreSelector', () => {
  const mockSetGenre = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useQueryState as jest.Mock).mockReturnValue([null, mockSetGenre])
  })

  it('renders the genre selector', () => {
    render(<BooksGenreSelector />)
    const label = screen.getByText('Жанр')
    const select = screen.getByRole('combobox')
    expect(label).toBeInTheDocument()
    expect(select).toBeInTheDocument()
  })

  it('displays the placeholder text when no genre is selected', () => {
    render(<BooksGenreSelector />)
    expect(screen.getByText('Виберіть жанр')).toBeInTheDocument()
  })

  it('shows all genre options including "Всі жанри"', async () => {
    render(<BooksGenreSelector />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)

    expect(screen.getByText('Всі жанри')).toBeInTheDocument()
    Object.values(Genres).forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument()
    })
  })

  it('calls setGenre with the selected genre', () => {
    render(<BooksGenreSelector />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    fireEvent.click(screen.getByText('Художня література'))

    expect(mockSetGenre).toHaveBeenCalledWith('Художня література')
  })

  it('calls setGenre with null when "Всі жанри" is selected', () => {
    render(<BooksGenreSelector />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    fireEvent.click(screen.getByText('Всі жанри'))

    expect(mockSetGenre).toHaveBeenCalledWith(null)
  })

  it('initializes with the URL genre parameter', async () => {
    ;(useQueryState as jest.Mock).mockReturnValue([
      'Художня література',
      mockSetGenre,
    ])
    render(<BooksGenreSelector />)

    await waitFor(() => {
      const select = screen.getByRole('combobox')
      expect(select).toHaveTextContent('Художня література')
    })
  })

  it('handles undefined genre gracefully', async () => {
    ;(useQueryState as jest.Mock).mockReturnValue([undefined, mockSetGenre])

    render(<BooksGenreSelector />)

    await waitFor(() => {
      const select = screen.getByRole('combobox')
      expect(select).toHaveTextContent('Виберіть жанр')
    })
  })
})
