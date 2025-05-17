import { render, screen } from '@testing-library/react'

import ProfilePageView from '@/app/profile/components/presentational/profile-page-view'
import { Book } from '@/types/book'

jest.mock('@/app/profile/components/containers/profile-card-container', () => ({
  __esModule: true,
  default: () => <div data-testid='profile-card'>Profile Card</div>,
}))

jest.mock(
  '@/app/profile/components/containers/security-form-container',
  () => ({
    __esModule: true,
    default: () => <div data-testid='security-form'>Security Form</div>,
  }),
)

jest.mock(
  '@/app/profile/components/presentational/favorite-books-view',
  () => ({
    __esModule: true,
    default: ({
      favoriteBooks,
      isLoading,
    }: {
      favoriteBooks: Book[]
      isLoading: boolean
    }) => (
      <div data-testid='favorite-books'>
        Favorite Books
        {isLoading && <span>Loading...</span>}
        {!isLoading && favoriteBooks.length === 0 && <span>No books</span>}
        {!isLoading && favoriteBooks.length > 0 && <span>Has books</span>}
      </div>
    ),
  }),
)

const mockUser = {
  _id: '1',
  username: 'testuser',
  email: 'test@example.com',
}

describe('ProfilePageView', () => {
  it('renders profile card', () => {
    render(<ProfilePageView user={mockUser} />)

    expect(screen.getByText('Ваш профіль')).toBeInTheDocument()
    expect(screen.getByTestId('profile-card')).toBeInTheDocument()
  })

  it('renders skeleton when user is null', () => {
    render(<ProfilePageView user={null} />)

    expect(screen.getByText('Ваш профіль')).toBeInTheDocument()
    expect(screen.getAllByRole('skeleton').length).toBeGreaterThan(0)
  })
})
