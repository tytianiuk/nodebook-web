import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import profileAPI from '@/api/profile-api'
import FavoriteBooks from '@/app/profile/components/favorite-books'
import { Accordion } from '@/components/ui/accordion'

jest.mock('@/api/profile-api', () => ({
  getLikedBooks: jest.fn(),
}))

// const mockBooks = [
//   {
//     id: '1',
//     name: 'Book 1',
//     author: 'Author 1',
//     category: 'Category 1',
//     averageRating: 4.5,
//   },
//   {
//     id: '2',
//     name: 'Book 2',
//     author: 'Author 2',
//     category: 'Category 2',
//     averageRating: 4.0,
//   },
// ]

describe('FavoriteBooks', () => {
  // it('renders favorite books correctly', async () => {
  //   ;(profileAPI.getLikedBooks as jest.Mock).mockResolvedValue(mockBooks)
  //   render(
  //     <Accordion type='single'>
  //       <FavoriteBooks />
  //     </Accordion>,
  //   )
  //   fireEvent.click(screen.getByText('Вподобані книжки'))

  //   await waitFor(() => {
  //     expect(screen.getByText('Вподобані книжки')).toBeInTheDocument()
  //     expect(screen.getByText('Book 1')).toBeInTheDocument()
  //     expect(screen.getByText('Book 2')).toBeInTheDocument()
  //   })
  // })

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
