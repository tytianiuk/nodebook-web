import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import profileAPI from '@/api/profile-api'
import ProfilePageContainer from '@/app/profile/components/containers/profile-page-container'
import useUserStore from '@/hooks/store/use-user-store'

jest.mock('@/api/profile-api', () => ({
  getLikedBooks: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}))

jest.mock('@/hooks/store/use-user-store', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockUser = {
  _id: '1',
  username: 'testuser',
  email: 'test@example.com',
}

const mockBooks = [
  {
    _id: '1',
    name: 'Favorite Book 1',
    pageQuantity: 100,
    author: 'Author 1',
    categoryId: { _id: '1', name: 'Category 1' },
    averageRating: 4,
    comments: [],
    reviews: [],
  },
  {
    _id: '2',
    name: 'Favorite Book 2',
    pageQuantity: 200,
    author: 'Author 2',
    categoryId: { _id: '2', name: 'Category 2' },
    averageRating: 5,
    comments: [],
    reviews: [],
  },
]

describe('ProfilePageContainer with FavoriteBooks', () => {
  beforeEach(() => {
    ;(useUserStore as unknown as jest.Mock).mockReturnValue({ user: mockUser })
  })

  it('fetches and displays favorite books', async () => {
    ;(profileAPI.getLikedBooks as jest.Mock).mockResolvedValue(mockBooks)

    await act(async () => {
      render(<ProfilePageContainer />)
    })

    await waitFor(() => {
      expect(profileAPI.getLikedBooks).toHaveBeenCalled()
    })

    expect(screen.getByText('Вподобані книжки')).toBeInTheDocument()
  })

  it('handles empty favorite books list', async () => {
    ;(profileAPI.getLikedBooks as jest.Mock).mockResolvedValue({ data: [] })

    await act(async () => {
      render(<ProfilePageContainer />)
    })

    await waitFor(() => {
      expect(profileAPI.getLikedBooks).toHaveBeenCalled()
    })

    expect(screen.getByText('Вподобані книжки')).toBeInTheDocument()
  })
})
