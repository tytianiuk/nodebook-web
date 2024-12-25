import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import AuthAPI from '@/api/auth-api'
import SignInForm from '@/app/auth/components/sign-in-form'

jest.mock('@/api/auth-api', () => ({
  login: jest.fn(),
  getMe: jest.fn(),
}))

const mockReplace = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}))

const mockToast = jest.fn()
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}))

const mockSetUser = jest.fn()
jest.mock('@/hooks/store/use-user-store', () => ({
  __esModule: true,
  default: () => ({
    setUser: mockSetUser,
  }),
}))

const mockUser = {
  data: {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
  },
}

describe('SignInForm Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('handles successful login', async () => {
    ;(AuthAPI.login as jest.Mock).mockResolvedValue(mockUser)
    ;(AuthAPI.getMe as jest.Mock).mockResolvedValue(mockUser)

    render(<SignInForm />)

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Увійти' }))

    await waitFor(() => {
      expect(AuthAPI.login).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      )
      expect(AuthAPI.getMe).toHaveBeenCalled()
      expect(mockSetUser).toHaveBeenCalledWith({
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
      })
      expect(mockReplace).toHaveBeenCalledWith('/')
    })
  })

  it('handles login failure', async () => {
    jest.mocked(AuthAPI.login).mockRejectedValue(new Error())

    render(<SignInForm />)

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Увійти' }))

    await waitFor(() => {
      expect(AuthAPI.login).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      )
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Помилка при вході',
        description:
          'Пароль або пошта введені не правильно. Можливо цього профілю не існує.',
        variant: 'destructive',
      })
    })
  })

  it('disables submit button when fields are empty', () => {
    render(<SignInForm />)

    expect(screen.getByRole('button', { name: 'Увійти' })).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    expect(screen.getByRole('button', { name: 'Увійти' })).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    })
    expect(screen.getByRole('button', { name: 'Увійти' })).toBeEnabled()
  })
})
