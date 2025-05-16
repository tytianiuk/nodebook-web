import { render, screen, fireEvent } from '@testing-library/react'
import { useQueryState } from 'nuqs'
import React from 'react'

import '@testing-library/jest-dom'
import BooksSearch from '@/app/catalog/components/books-search'

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}))

describe('BooksSearch', () => {
  const mockSetUrlName = jest.fn()
  const mockSetUrlAuthor = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useQueryState as jest.Mock).mockImplementation((param) => {
      if (param === 'name') {
        return [null, mockSetUrlName]
      } else if (param === 'author') {
        return [null, mockSetUrlAuthor]
      }
      return [null, jest.fn()]
    })
  })

  it('renders both search inputs with correct labels', () => {
    render(<BooksSearch />)

    const nameInput = screen.getByLabelText('Пошук за назвою книги')
    expect(nameInput).toBeInTheDocument()
    expect(nameInput).toHaveAttribute('type', 'text')
    expect(nameInput).toHaveAttribute('placeholder', 'Назва книги...')

    const authorInput = screen.getByLabelText('Пошук за автором')
    expect(authorInput).toBeInTheDocument()
    expect(authorInput).toHaveAttribute('type', 'text')
    expect(authorInput).toHaveAttribute('placeholder', "Ім'я автора книги...")
  })

  it('updates the name input value when typing', () => {
    render(<BooksSearch />)
    const nameInput = screen.getByLabelText(
      'Пошук за назвою книги',
    ) as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'Дюна' } })
    expect(nameInput.value).toBe('Дюна')
  })

  it('updates the author input value when typing', () => {
    render(<BooksSearch />)
    const authorInput = screen.getByLabelText(
      'Пошук за автором',
    ) as HTMLInputElement
    fireEvent.change(authorInput, { target: { value: 'Френк Герберт' } })
    expect(authorInput.value).toBe('Френк Герберт')
  })

  it('calls setUrlName with the name input value', () => {
    render(<BooksSearch />)
    const nameInput = screen.getByLabelText('Пошук за назвою книги')
    fireEvent.change(nameInput, { target: { value: 'Володар перснів' } })
    expect(mockSetUrlName).toHaveBeenCalledWith('Володар перснів')
  })

  it('calls setUrlAuthor with the author input value', () => {
    render(<BooksSearch />)
    const authorInput = screen.getByLabelText('Пошук за автором')
    fireEvent.change(authorInput, { target: { value: 'Дж. Р. Р. Толкін' } })
    expect(mockSetUrlAuthor).toHaveBeenCalledWith('Дж. Р. Р. Толкін')
  })

  it('calls setUrlName with null when name input is cleared', () => {
    render(<BooksSearch />)
    const nameInput = screen.getByLabelText('Пошук за назвою книги')
    fireEvent.change(nameInput, { target: { value: 'Володар перснів' } })
    fireEvent.change(nameInput, { target: { value: '' } })
    expect(mockSetUrlName).toHaveBeenCalledWith(null)
  })

  it('calls setUrlAuthor with null when author input is cleared', () => {
    render(<BooksSearch />)
    const authorInput = screen.getByLabelText('Пошук за автором')
    fireEvent.change(authorInput, { target: { value: 'Дж. Р. Р. Толкін' } })
    fireEvent.change(authorInput, { target: { value: '' } })
    expect(mockSetUrlAuthor).toHaveBeenCalledWith(null)
  })

  it('initializes with the URL name parameter', () => {
    ;(useQueryState as jest.Mock).mockImplementation((param) => {
      if (param === 'name') {
        return ['Дюна', mockSetUrlName]
      }
      return [null, jest.fn()]
    })

    render(<BooksSearch />)
    const nameInput = screen.getByLabelText(
      'Пошук за назвою книги',
    ) as HTMLInputElement
    expect(nameInput.value).toBe('Дюна')
  })

  it('initializes with the URL author parameter', () => {
    ;(useQueryState as jest.Mock).mockImplementation((param) => {
      if (param === 'author') {
        return ['Френк Герберт', mockSetUrlAuthor]
      }
      return [null, jest.fn()]
    })

    render(<BooksSearch />)
    const authorInput = screen.getByLabelText(
      'Пошук за автором',
    ) as HTMLInputElement
    expect(authorInput.value).toBe('Френк Герберт')
  })

  it('handles null as the initial URL parameters', () => {
    ;(useQueryState as jest.Mock).mockImplementation(() => [null, jest.fn()])

    render(<BooksSearch />)
    const nameInput = screen.getByLabelText(
      'Пошук за назвою книги',
    ) as HTMLInputElement
    const authorInput = screen.getByLabelText(
      'Пошук за автором',
    ) as HTMLInputElement

    expect(nameInput.value).toBe('')
    expect(authorInput.value).toBe('')
  })

  it('handles undefined as the initial URL parameters', () => {
    ;(useQueryState as jest.Mock).mockImplementation(() => [
      undefined,
      jest.fn(),
    ])

    render(<BooksSearch />)
    const nameInput = screen.getByLabelText(
      'Пошук за назвою книги',
    ) as HTMLInputElement
    const authorInput = screen.getByLabelText(
      'Пошук за автором',
    ) as HTMLInputElement

    expect(nameInput.value).toBe('')
    expect(authorInput.value).toBe('')
  })

  it('handles very long inputs for both fields', () => {
    render(<BooksSearch />)
    const nameInput = screen.getByLabelText(
      'Пошук за назвою книги',
    ) as HTMLInputElement
    const authorInput = screen.getByLabelText(
      'Пошук за автором',
    ) as HTMLInputElement

    const longText = 'а'.repeat(500)

    fireEvent.change(nameInput, { target: { value: longText } })
    expect(nameInput.value).toBe(longText)
    expect(mockSetUrlName).toHaveBeenCalledWith(longText)

    fireEvent.change(authorInput, { target: { value: longText } })
    expect(authorInput.value).toBe(longText)
    expect(mockSetUrlAuthor).toHaveBeenCalledWith(longText)
  })
})
