import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useQueryState } from 'nuqs'
import React from 'react'

import '@testing-library/jest-dom'
import BooksCategorySelector from '@/app/catalog/components/book-category-selector'
import { Categories } from '@/constants/categories'

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}))

describe('BooksCategorySelector', () => {
  const mockSetCategory = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useQueryState as jest.Mock).mockReturnValue([null, mockSetCategory])
  })

  it('renders the category selector', () => {
    render(<BooksCategorySelector />)
    const label = screen.getByText('Жанр')
    const select = screen.getByRole('combobox')
    expect(label).toBeInTheDocument()
    expect(select).toBeInTheDocument()
  })

  it('displays the placeholder text when no category is selected', () => {
    render(<BooksCategorySelector />)
    expect(screen.getByText('Виберіть жанр')).toBeInTheDocument()
  })

  it('shows all category options including "Всі жанри"', async () => {
    render(<BooksCategorySelector />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)

    expect(screen.getByText('Всі жанри')).toBeInTheDocument()
    Object.values(Categories).forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it('calls setCategory with the selected category', () => {
    render(<BooksCategorySelector />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    fireEvent.click(screen.getByText('Художня література'))

    expect(mockSetCategory).toHaveBeenCalledWith('Художня література')
  })

  it('calls setCategory with null when "Всі жанри" is selected', () => {
    render(<BooksCategorySelector />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    fireEvent.click(screen.getByText('Всі жанри'))

    expect(mockSetCategory).toHaveBeenCalledWith(null)
  })

  it('initializes with the URL category parameter', async () => {
    ;(useQueryState as jest.Mock).mockReturnValue([
      'Художня література',
      mockSetCategory,
    ])
    render(<BooksCategorySelector />)

    await waitFor(() => {
      const select = screen.getByRole('combobox')
      expect(select).toHaveTextContent('Художня література')
    })
  })

  it('handles undefined category gracefully', async () => {
    ;(useQueryState as jest.Mock).mockReturnValue([undefined, mockSetCategory])

    render(<BooksCategorySelector />)

    await waitFor(() => {
      const select = screen.getByRole('combobox')
      expect(select).toHaveTextContent('Виберіть жанр')
    })
  })
})
