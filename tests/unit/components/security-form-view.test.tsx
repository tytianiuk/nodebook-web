import { render, screen, fireEvent } from '@testing-library/react'

import SecurityFormView from '@/app/profile/components/presentational/security-form-view'
import { Accordion } from '@/components/ui/accordion'

describe('SecurityFormView', () => {
  const mockProps = {
    register: jest.fn(),
    handleSubmit: jest.fn((callback) => (e?: React.BaseSyntheticEvent) => {
      if (e && e.preventDefault) e.preventDefault()
      return Promise.resolve(
        callback({ newPassword: 'test123', confirmPassword: 'test123' }),
      ) as Promise<void>
    }),
    onSubmit: jest.fn(),
    errors: {},
    isSubmitting: false,
    allFieldsFilled: true,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form fields correctly', () => {
    render(
      <Accordion type='single' defaultValue='security'>
        <SecurityFormView {...mockProps} />
      </Accordion>,
    )

    expect(screen.getByText('Безпека')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByText('Змінити пароль')).toBeInTheDocument()
  })

  it('calls onSubmit when form is submitted', () => {
    render(
      <Accordion type='single' defaultValue='security'>
        <SecurityFormView {...mockProps} />
      </Accordion>,
    )

    fireEvent.submit(screen.getByRole('form'))
    expect(mockProps.onSubmit).toHaveBeenCalled()
  })

  it('disables submit button when isSubmitting is true', () => {
    render(
      <Accordion type='single' defaultValue='security'>
        <SecurityFormView {...mockProps} isSubmitting={true} />
      </Accordion>,
    )

    expect(screen.getByText('Зміна паролю...')).toBeInTheDocument()
    expect(screen.getByRole('form-button')).toBeDisabled()
  })

  it('disables submit button when not all fields are filled', () => {
    render(
      <Accordion type='single' defaultValue='security'>
        <SecurityFormView {...mockProps} allFieldsFilled={false} />
      </Accordion>,
    )

    expect(screen.getByRole('form-button')).toBeDisabled()
  })

  it('displays error messages', () => {
    const errorsWithMessage = {
      newPassword: {
        type: 'manual',
        message: 'Пароль повинен містити мінімум 8 символів',
      },
      confirmPassword: { type: 'manual', message: 'Паролі не співпадають' },
    }

    render(
      <Accordion type='single' defaultValue='security'>
        <SecurityFormView {...mockProps} errors={errorsWithMessage} />
      </Accordion>,
    )
  })
})
