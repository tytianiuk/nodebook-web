import { render, screen, fireEvent } from '@testing-library/react'
import { useQueryState } from 'nuqs'
import React from 'react'

import '@testing-library/jest-dom'
import BooksSearch from '@/app/catalog/components/books-search'

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}))

describe('BooksSearch', () => {
  const mockSetUrlSearch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useQueryState as jest.Mock).mockReturnValue([null, mockSetUrlSearch])
  })

  it('renders the search input', () => {
    render(<BooksSearch />)
    const input = screen.getByLabelText('Пошук')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('placeholder', 'Назва, автор')
  })

  it('updates the input value when typing', () => {
    render(<BooksSearch />)
    const input = screen.getByLabelText('Пошук') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Дюна' } })
    expect(input.value).toBe('Дюна')
  })

  it('calls setUrlSearch with the input value', () => {
    render(<BooksSearch />)
    const input = screen.getByLabelText('Пошук')
    fireEvent.change(input, { target: { value: 'Гаррі Поттер' } })
    expect(mockSetUrlSearch).toHaveBeenCalledWith('Гаррі Поттер')
  })

  it('calls setUrlSearch with null when input is cleared', () => {
    render(<BooksSearch />)
    const input = screen.getByLabelText('Пошук')
    fireEvent.change(input, { target: { value: 'Гаррі Поттер' } })
    fireEvent.change(input, { target: { value: '' } })
    expect(mockSetUrlSearch).toHaveBeenCalledWith(null)
  })

  it('initializes with the URL search parameter', () => {
    ;(useQueryState as jest.Mock).mockReturnValue(['Дюна', mockSetUrlSearch])
    render(<BooksSearch />)
    const input = screen.getByLabelText('Пошук') as HTMLInputElement
    expect(input.value).toBe('Дюна')
  })

  it('handles null as the initial URL search parameter', () => {
    ;(useQueryState as jest.Mock).mockReturnValue([null, mockSetUrlSearch])
    render(<BooksSearch />)
    const input = screen.getByLabelText('Пошук') as HTMLInputElement
    expect(input.value).toBe('')
  })

  it('handles undefined as the initial URL search parameter', () => {
    ;(useQueryState as jest.Mock).mockReturnValue([undefined, mockSetUrlSearch])
    render(<BooksSearch />)
    const input = screen.getByLabelText('Пошук') as HTMLInputElement
    expect(input.value).toBe('')
  })

  it('handles a very long search input', () => {
    render(<BooksSearch />)
    const input = screen.getByLabelText('Пошук') as HTMLInputElement
    const longText = 'а'.repeat(500)
    fireEvent.change(input, { target: { value: longText } })
    expect(input.value).toBe(longText)
    expect(mockSetUrlSearch).toHaveBeenCalledWith(longText)
  })
})
