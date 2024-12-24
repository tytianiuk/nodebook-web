import { useQuery } from '@tanstack/react-query'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useQueryState } from 'nuqs'
import React from 'react'

import '@testing-library/jest-dom'
import BooksCategorySelector from '@/app/catalog/components/book-category-selector'
import { Category } from '@/types/categories'

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}))

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}))

describe('BooksCategorySelector', () => {
  const mockSetCategory = jest.fn()

  const categories: Category[] = [
    { _id: '1', name: 'Пригоди' },
    { _id: '2', name: 'Фентезі' },
    { _id: '3', name: 'Художня література' },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useQueryState as jest.Mock).mockReturnValue([null, mockSetCategory])
    ;(useQuery as jest.Mock).mockReturnValue({ data: categories })
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
    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument()
    })
  })

  it('calls setCategory with the selected category id', () => {
    render(<BooksCategorySelector />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    fireEvent.click(screen.getByText('Художня література'))

    expect(mockSetCategory).toHaveBeenCalledWith('3')
  })

  it('calls setCategory with null when "Всі жанри" is selected', () => {
    render(<BooksCategorySelector />)
    const select = screen.getByRole('combobox')
    fireEvent.click(select)
    fireEvent.click(screen.getByText('Всі жанри'))

    expect(mockSetCategory).toHaveBeenCalledWith(null)
  })

  it('initializes with the URL category parameter', async () => {
    ;(useQueryState as jest.Mock).mockReturnValue(['3', mockSetCategory])
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
