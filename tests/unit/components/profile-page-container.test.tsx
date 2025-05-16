import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import profileAPI from '@/api/profile-api'
import ProfilePageContainer from '@/app/profile/components/containers/profile-page-container'
import useUserStore from '@/hooks/store/use-user-store'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}))

jest.mock('@/api/profile-api', () => ({
  getLikedBooks: jest.fn(),
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

describe('ProfilePageContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state when user is null', () => {
    ;(useUserStore as unknown as jest.Mock).mockReturnValue({ user: null })

    render(<ProfilePageContainer />)

    expect(screen.getByText('Ваш профіль')).toBeInTheDocument()
    expect(screen.getAllByRole('skeleton').length).toBeGreaterThan(0)
  })

  it('fetches favorite books when user is available', async () => {
    ;(useUserStore as unknown as jest.Mock).mockReturnValue({ user: mockUser })
    ;(profileAPI.getLikedBooks as jest.Mock).mockResolvedValue({ data: [] })

    await act(async () => {
      render(<ProfilePageContainer />)
    })

    await waitFor(() => {
      expect(profileAPI.getLikedBooks).toHaveBeenCalled()
    })

    expect(screen.getByText('Ваш профіль')).toBeInTheDocument()
  })

  it('handles API error when fetching books', async () => {
    ;(useUserStore as unknown as jest.Mock).mockReturnValue({ user: mockUser })
    ;(profileAPI.getLikedBooks as jest.Mock).mockRejectedValue(
      new Error('API Error'),
    )

    const originalConsoleError = console.error
    console.error = jest.fn()

    await act(async () => {
      render(<ProfilePageContainer />)
    })

    await waitFor(() => {
      expect(profileAPI.getLikedBooks).toHaveBeenCalled()
    })

    expect(screen.getByText('Ваш профіль')).toBeInTheDocument()

    console.error = originalConsoleError
  })
})
