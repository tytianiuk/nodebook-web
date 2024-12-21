import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useQueryState } from 'nuqs'
import React from 'react'

import '@testing-library/jest-dom'
import BooksRatingSelect from '@/app/catalog/components/books-rating-select'

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}))

describe('BooksRatingSelect', () => {
  const mockSetMinRating = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useQueryState as jest.Mock).mockImplementation(() => [
      null,
      mockSetMinRating,
    ])
  })

  it('renders the rating select with correct label', () => {
    render(<BooksRatingSelect />)
    expect(screen.getByText('Мінімальний рейтинг')).toBeInTheDocument()
  })

  it('displays the default placeholder', () => {
    render(<BooksRatingSelect />)
    expect(screen.getByText('Виберіть рейтинг')).toBeInTheDocument()
  })

  it('shows all rating options including "Будь-який"', async () => {
    render(<BooksRatingSelect />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)

    expect(screen.getByText('Будь-який')).toBeInTheDocument()
    const stars = ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']
    stars.forEach((star) => {
      expect(screen.getByText(star)).toBeInTheDocument()
    })
  })

  it('calls setMinRating with the selected rating', () => {
    render(<BooksRatingSelect />)
    fireEvent.click(screen.getByText('Виберіть рейтинг'))
    fireEvent.click(screen.getByText('4'))
    expect(mockSetMinRating).toHaveBeenCalledWith('4')
  })

  it('calls setMinRating with null when "Будь-який" is selected', () => {
    render(<BooksRatingSelect />)
    fireEvent.click(screen.getByText('Виберіть рейтинг'))
    fireEvent.click(screen.getByText('Будь-який'))
    expect(mockSetMinRating).toHaveBeenCalledWith(null)
  })

  it('initializes with a selected rating', async () => {
    ;(useQueryState as jest.Mock).mockReturnValue(['3.5', mockSetMinRating])
    render(<BooksRatingSelect />)

    await waitFor(() => {
      const select = screen.getByRole('combobox')
      expect(select).toHaveTextContent('3.5')
    })
  })

  it('handles undefined minRating gracefully', async () => {
    ;(useQueryState as jest.Mock).mockReturnValue([undefined, mockSetMinRating])
    render(<BooksRatingSelect />)

    await waitFor(() => {
      const select = screen.getByRole('combobox')
      expect(select).toHaveTextContent('Виберіть рейтинг')
    })
  })
})
