import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import profileAPI from '@/api/profile-api'
import FavoriteBooks from '@/app/profile/components/favorite-books'
import { Accordion } from '@/components/ui/accordion'

jest.mock('@/api/profile-api', () => ({
  getLikedBooks: jest.fn(),
}))

const mockBooks = [
  {
    _id: '1',
    name: 'Favorite Book 1',
    author: 'Author 1',
    categoryId: { name: 'Category 1' },
    averageRating: 4,
  },
  {
    _id: '2',
    name: 'Favorite Book 2',
    author: 'Author 2',
    categoryId: { name: 'Category 2' },
    averageRating: 5,
  },
]

describe('FavoriteBooks', () => {
  it('renders favorite books correctly', async () => {
    ;(profileAPI.getLikedBooks as jest.Mock).mockResolvedValue(mockBooks)
    render(
      <Accordion type='single'>
        <FavoriteBooks />
      </Accordion>,
    )
    fireEvent.click(screen.getByText('Вподобані книжки'))
    await waitFor(() => {
      expect(screen.getByText('Вподобані книжки')).toBeInTheDocument()
      expect(screen.getByText('Favorite Book 1')).toBeInTheDocument()
      expect(screen.getByText('Favorite Book 2')).toBeInTheDocument()
    })
  })
  it('handles empty favorite books list', async () => {
    ;(profileAPI.getLikedBooks as jest.Mock).mockResolvedValue([])
    render(
      <Accordion type='single'>
        <FavoriteBooks />
      </Accordion>,
    )
    await waitFor(() => {
      expect(screen.getByText('Вподобані книжки')).toBeInTheDocument()
      fireEvent.click(screen.getByText('Вподобані книжки'))
      expect(
        screen.getByText('У вас поки немає вподобаних книг.'),
      ).toBeInTheDocument()
    })
  })
})
