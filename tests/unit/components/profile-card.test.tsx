import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import profileAPI from '@/api/profile-api'
import ProfileCard from '@/app/profile/components/profile-card'
import { User } from '@/types/user'

// Мокуємо next/navigation
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

describe('ProfileCard', () => {
  beforeEach(() => {})

  it('renders user information correctly', () => {
    render(<ProfileCard user={mockUser} />)

    expect(screen.getByText(mockUser.username)).toBeInTheDocument()
    expect(screen.getByText(mockUser.email)).toBeInTheDocument()
  })

  it('opens logout dialog when logout button is clicked', () => {
    render(<ProfileCard user={mockUser} />)

    const logoutButton = screen.getByText('Вийти з профілю')
    fireEvent.click(logoutButton)

    expect(screen.getByText('Підтвердження виходу')).toBeInTheDocument()
  })

  it('calls logout function when confirmed', async () => {
    render(<ProfileCard user={mockUser} />)

    const logoutButton = screen.getByText('Вийти з профілю')
    fireEvent.click(logoutButton)

    const confirmButton = screen.getByText('Вийти')
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(profileAPI.logout).toHaveBeenCalled()
    })
  })
})
