import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import AuthAPI from '@/api/auth-api'
import SignUpForm from '@/app/auth/components/sign-up-form'

jest.mock('@/api/auth-api', () => ({
  register: jest.fn(),
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

describe('SignUpForm Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('handles successful registration', async () => {
    jest.mocked(AuthAPI.register).mockResolvedValue({ status: 201 })
    jest.mocked(AuthAPI.login).mockResolvedValue({})
    jest.mocked(AuthAPI.getMe).mockResolvedValue({
      id: '1',
      username: 'Test User',
      email: 'test@example.com',
    })

    render(<SignUpForm />)

    fireEvent.change(screen.getByLabelText("Ім'я"), {
      target: { value: 'Test User' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Підтвердження паролю'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Зареєструватися' }))

    await waitFor(() => {
      expect(AuthAPI.register).toHaveBeenCalledWith(
        'Test User',
        'test@example.com',
        'password123',
      )
      expect(AuthAPI.login).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      )
      expect(AuthAPI.getMe).toHaveBeenCalled()
      expect(mockSetUser).toHaveBeenCalledWith({
        id: '1',
        username: 'Test User',
        email: 'test@example.com',
      })
      expect(mockReplace).toHaveBeenCalledWith('/')
    })
  })

  it('handles registration failure', async () => {
    const error = new Error('Registration failed')
    jest.mocked(AuthAPI.register).mockRejectedValue(error)

    render(<SignUpForm />)

    fireEvent.change(screen.getByLabelText("Ім'я"), {
      target: { value: 'Test User' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Підтвердження паролю'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Зареєструватися' }))

    await waitFor(() => {
      expect(AuthAPI.register).toHaveBeenCalledWith(
        'Test User',
        'test@example.com',
        'password123',
      )
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Помилка при створенні аккаунту',
        description: 'Registration failed',
        variant: 'destructive',
      })
    })
  })

  it('button is dasibled when fields are empty', async () => {
    render(<SignUpForm />)

    expect(
      screen.getByRole('button', { name: 'Зареєструватися' }),
    ).toBeDisabled()

    fireEvent.change(screen.getByLabelText("Ім'я"), {
      target: { value: 'Test User' },
    })
    expect(
      screen.getByRole('button', { name: 'Зареєструватися' }),
    ).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })

    expect(
      screen.getByRole('button', { name: 'Зареєструватися' }),
    ).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    })
    expect(
      screen.getByRole('button', { name: 'Зареєструватися' }),
    ).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Підтвердження паролю'), {
      target: { value: 'password123' },
    })
    expect(
      screen.getByRole('button', { name: 'Зареєструватися' }),
    ).toBeEnabled()
  })

  it('validates form fields before submission', async () => {
    render(<SignUpForm />)

    fireEvent.change(screen.getByLabelText("Ім'я"), {
      target: { value: 'Test User' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@t.t' },
    })
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'pass' },
    })
    fireEvent.change(screen.getByLabelText('Підтвердження паролю'), {
      target: { value: 'pass' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Зареєструватися' }))

    await waitFor(() => {
      expect(screen.getByText('Невірний формат email')).toBeInTheDocument()
      expect(screen.getAllByText('Мінімум 8 символів')).toHaveLength(2)
    })
  })

  it('checks if passwords match', async () => {
    render(<SignUpForm />)

    fireEvent.change(screen.getByLabelText("Ім'я"), {
      target: { value: 'Test User' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText('Підтвердження паролю'), {
      target: { value: 'password456' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Зареєструватися' }))

    await waitFor(() => {
      expect(screen.getByText('Паролі не співпадають')).toBeInTheDocument()
    })
  })
})
