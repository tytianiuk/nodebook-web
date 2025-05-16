import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import profileAPI from '@/api/profile-api'
import ProfileCardContainer from '@/app/profile/components/containers/profile-card-container'
import type { User } from '@/types/user'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}))

jest.mock('@/api/profile-api', () => ({
  logout: jest.fn(),
}))

jest.mock('@/hooks/store/use-user-store', () => ({
  __esModule: true,
  default: () => ({
    setUser: jest.fn(),
  }),
}))

const mockUser: User = {
  _id: '1',
  username: 'testuser',
  email: 'test@example.com',
}

describe('ProfileCardContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders user information correctly', () => {
    render(<ProfileCardContainer user={mockUser} />)

    expect(screen.getByText(mockUser.username)).toBeInTheDocument()
    expect(screen.getByText(mockUser.email)).toBeInTheDocument()
  })

  it('opens logout dialog when logout button is clicked', () => {
    render(<ProfileCardContainer user={mockUser} />)

    const logoutButton = screen.getByText('Вийти з профілю')
    fireEvent.click(logoutButton)

    expect(screen.getByText('Підтвердження виходу')).toBeInTheDocument()
  })

  it('calls logout function when confirmed', async () => {
    render(<ProfileCardContainer user={mockUser} />)

    const logoutButton = screen.getByText('Вийти з профілю')
    fireEvent.click(logoutButton)

    const confirmButton = screen.getByText('Вийти')
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(profileAPI.logout).toHaveBeenCalled()
    })
  })
})
