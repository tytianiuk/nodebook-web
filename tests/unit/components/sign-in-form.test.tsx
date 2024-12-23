import { render, screen } from '@testing-library/react'

import SignInForm from '@/app/auth/components/sign-in-form'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}))

describe('SignInForm', () => {
  beforeEach(() => {
    render(<SignInForm />)
  })

  it('renders all required fields and submit button', () => {
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Увійти' })).toBeInTheDocument()
  })

  it('displays correct placeholders for input fields', () => {
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })

  it('renders the form with correct aria attributes', () => {
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
  })
})
