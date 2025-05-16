import { render, screen, fireEvent } from '@testing-library/react'

import ProfileCardView from '@/app/profile/components/presentational/profile-card-view'
import type { User } from '@/types/user'

const mockUser: User = {
  _id: '1',
  username: 'testuser',
  email: 'test@example.com',
}

describe('ProfileCardView', () => {
  it('renders user information correctly', () => {
    const mockOnLogoutClick = jest.fn()
    render(
      <ProfileCardView
        user={mockUser}
        getNameAbbreviation={() => mockUser.username[0].toUpperCase()}
        onLogoutClick={mockOnLogoutClick}
      />,
    )

    expect(screen.getByText(mockUser.username)).toBeInTheDocument()
    expect(screen.getByText(mockUser.email)).toBeInTheDocument()
  })

  it('calls onLogoutClick when logout button is clicked', () => {
    const mockOnLogoutClick = jest.fn()
    render(
      <ProfileCardView
        user={mockUser}
        getNameAbbreviation={() => mockUser.username[0].toUpperCase()}
        onLogoutClick={mockOnLogoutClick}
      />,
    )

    const logoutButton = screen.getByText('Вийти з профілю')
    fireEvent.click(logoutButton)

    expect(mockOnLogoutClick).toHaveBeenCalled()
  })

  it('renders skeleton when user is null', () => {
    const mockOnLogoutClick = jest.fn()
    render(
      <ProfileCardView
        user={null}
        getNameAbbreviation={() => ''}
        onLogoutClick={mockOnLogoutClick}
      />,
    )

    expect(screen.getAllByRole('skeleton')).toHaveLength(3)

    const logoutButton = screen.getByText('Вийти з профілю')
    expect(logoutButton).toBeDisabled()
  })
})
