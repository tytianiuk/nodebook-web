import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import ProfileAPI from '@/api/profile-api'
import ProfilePage from '@/app/profile/page'

jest.mock('@/api/profile-api')

const mockUser = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
}

jest.mock('@/hooks/store/use-user-store', () => ({
  __esModule: true,
  default: () => ({
    setUser: jest.fn(),
    user: mockUser,
  }),
}))

const mockToast = jest.fn()
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}))

const mockBooks = {
  data: [
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
  ],
}

describe('ProfilePage Integration', () => {
  beforeEach(() => {
    ;(ProfileAPI.logout as jest.Mock).mockResolvedValue({})
    ;(ProfileAPI.getLikedBooks as jest.Mock).mockResolvedValue(mockBooks)
    ;(ProfileAPI.changePassword as jest.Mock).mockResolvedValue({})
  })
  it('renders all components correctly', async () => {
    render(<ProfilePage />)
    expect(screen.getByText('Ваш профіль')).toBeInTheDocument()
    expect(screen.getByText(mockUser.username)).toBeInTheDocument()
    expect(screen.getByText('Безпека')).toBeInTheDocument()
    expect(screen.getByText('Вподобані книжки')).toBeInTheDocument()
  })
  it('handles logout process', async () => {
    render(<ProfilePage />)
    fireEvent.click(screen.getByText('Вийти з профілю'))
    const confirmButton = screen.getByText('Вийти')
    fireEvent.click(confirmButton)
    await waitFor(() => {
      expect(ProfileAPI.logout).toHaveBeenCalled()
    })
  })
  it('handles password change', async () => {
    render(<ProfilePage />)
    fireEvent.click(screen.getByText('Безпека'))
    fireEvent.change(screen.getByLabelText('Новий пароль'), {
      target: { value: 'newpassword123' },
    })
    fireEvent.change(screen.getByLabelText('Підтвердження нового пароля'), {
      target: { value: 'newpassword123' },
    })
    fireEvent.click(screen.getByText('Змінити пароль'))
    await waitFor(() => {
      expect(ProfileAPI.changePassword).toHaveBeenCalledWith('newpassword123')
    })
  })
  it('handles password change failure', async () => {
    render(<ProfilePage />)
    jest.mocked(ProfileAPI.changePassword).mockRejectedValue(new Error())
    fireEvent.click(screen.getByText('Безпека'))
    fireEvent.change(screen.getByLabelText('Новий пароль'), {
      target: { value: 'newpassword123' },
    })
    fireEvent.change(screen.getByLabelText('Підтвердження нового пароля'), {
      target: { value: 'newpassword123' },
    })
    fireEvent.click(screen.getByText('Змінити пароль'))
    await waitFor(() => {
      expect(ProfileAPI.changePassword).toHaveBeenCalledWith('newpassword123')
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Помилка!',
        description: 'Не вдалося змінити пароль. Спробуйте ще раз.',
        variant: 'destructive',
      })
    })
  })
  it('loads and displays favorite books', async () => {
    render(<ProfilePage />)
    await waitFor(() => {
      expect(ProfileAPI.getLikedBooks).toHaveBeenCalled()
    })
    fireEvent.click(screen.getByText('Вподобані книжки'))
    await waitFor(() => {
      expect(screen.getByText('Favorite Book 1')).toBeInTheDocument()
      expect(screen.getByText('Favorite Book 2')).toBeInTheDocument()
    })
  })
  it('handles API errors gracefully', async () => {
    ;(ProfileAPI.getLikedBooks as jest.Mock).mockRejectedValueOnce(new Error())
    render(<ProfilePage />)
    await waitFor(() => {
      expect(ProfileAPI.getLikedBooks).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(screen.getByText('Вподобані книжки')).toBeInTheDocument()
      fireEvent.click(screen.getByText('Вподобані книжки'))
      expect(
        screen.getByText('У вас поки немає вподобаних книг.'),
      ).toBeInTheDocument()
    })
  })
})
