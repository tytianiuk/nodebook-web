import { render, screen } from '@testing-library/react'

import SignUpForm from '@/app/auth/components/sign-up-form'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}))

describe('SignUpForm', () => {
  beforeEach(() => {
    render(<SignUpForm />)
  })

  it('renders all required fields and submit button', () => {
    expect(screen.getByLabelText("Ім'я")).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument()
    expect(screen.getByLabelText('Підтвердження паролю')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Зареєструватися' }),
    ).toBeInTheDocument()
  })

  it('displays correct placeholders for input fields', () => {
    expect(screen.getByPlaceholderText('Іван Петренко')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText('••••••••')).toHaveLength(2)
  })

  it('renders the form with correct aria attributes', () => {
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
  })
})
