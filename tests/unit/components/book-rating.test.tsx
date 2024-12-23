import { render, screen } from '@testing-library/react'

import BookRating from '@/components/book-rating'

describe('BookRating Component', () => {
  it('should render the correct number of filled stars', () => {
    render(<BookRating rating={3.5} />)
    const filledStars = screen.getAllByTestId('filled-star')
    expect(filledStars.length).toBe(3)
  })

  it('should render the correct number of empty stars', () => {
    render(<BookRating rating={3.5} />)
    const emptyStars = screen.getAllByTestId('empty-star')
    expect(emptyStars.length).toBe(2)
  })

  it('should display the correct rating value', () => {
    render(<BookRating rating={3.5} />)
    const ratingValue = screen.getByText('3.5')
    expect(ratingValue).toBeInTheDocument()
  })

  it('displays the correct rating value rounded to one decimal', () => {
    render(<BookRating rating={3.567} />)
    const ratingValue = screen.getByTestId('rating')
    expect(ratingValue).toHaveTextContent('3.6')
  })

  it('should handle a rating of 0', () => {
    render(<BookRating rating={0} />)
    const filledStars = screen.queryAllByTestId('filled-star')
    expect(filledStars.length).toBe(0)
    const emptyStars = screen.getAllByTestId('empty-star')
    expect(emptyStars.length).toBe(5)
  })

  it('should handle a rating of 5', () => {
    render(<BookRating rating={5} />)
    const filledStars = screen.getAllByTestId('filled-star')
    expect(filledStars.length).toBe(5)
    const emptyStars = screen.queryAllByTestId('empty-star')
    expect(emptyStars.length).toBe(0)
  })

  it('applies correct styles for filled and empty stars', () => {
    render(<BookRating rating={2.5} />)
    const filledStar = screen.getAllByTestId('filled-star')[0]
    const emptyStar = screen.getAllByTestId('empty-star')[0]

    expect(filledStar).toHaveClass('text-yellow-400')
    expect(emptyStar).toHaveClass('text-gray-300')
  })

  it('handles undefined rating gracefully', () => {
    render(<BookRating rating={undefined as unknown as number} />)
    const filledStars = screen.queryAllByTestId('filled-star')
    const emptyStars = screen.getAllByTestId('empty-star')
    const ratingValue = screen.queryByTestId('rating')

    expect(filledStars.length).toBe(0)
    expect(emptyStars.length).toBe(5)
    expect(ratingValue).toBeInTheDocument()
  })

  it('handles null rating gracefully', () => {
    render(<BookRating rating={null as unknown as number} />)
    const filledStars = screen.queryAllByTestId('filled-star')
    const emptyStars = screen.getAllByTestId('empty-star')
    const ratingValue = screen.queryByTestId('rating')

    expect(filledStars.length).toBe(0)
    expect(emptyStars.length).toBe(5)
    expect(ratingValue).toBeInTheDocument()
  })
})
