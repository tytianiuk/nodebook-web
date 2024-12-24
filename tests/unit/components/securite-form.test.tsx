import { Accordion } from '@radix-ui/react-accordion'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import profileAPI from '@/api/profile-api'
import SecurityForm from '@/app/profile/components/security-form'

jest.mock('@/api/profile-api', () => ({
  changePassword: jest.fn(),
}))

describe('SecurityForm', () => {
  beforeEach(() => {
    render(
      <Accordion type='single'>
        <SecurityForm />
      </Accordion>,
    )
  })
  it('renders security form correctly', () => {
    expect(screen.getByText('Безпека')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Безпека'))
    expect(screen.getByLabelText('Новий пароль')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Підтвердження нового пароля'),
    ).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    fireEvent.click(screen.getByText('Безпека'))
    fireEvent.change(screen.getByLabelText('Новий пароль'), {
      target: { value: 'newpassword123' },
    })
    fireEvent.change(screen.getByLabelText('Підтвердження нового пароля'), {
      target: { value: 'newpassword123' },
    })

    fireEvent.click(screen.getByText('Змінити пароль'))

    await waitFor(() => {
      expect(profileAPI.changePassword).toHaveBeenCalledWith('newpassword123')
    })
  })

  it('shows error when passwords do not match', async () => {
    fireEvent.click(screen.getByText('Безпека'))
    fireEvent.change(screen.getByLabelText('Новий пароль'), {
      target: { value: 'newpassword123' },
    })
    fireEvent.change(screen.getByLabelText('Підтвердження нового пароля'), {
      target: { value: 'differentpassword' },
    })

    fireEvent.click(screen.getByText('Змінити пароль'))

    await waitFor(() => {
      expect(screen.getByText('Паролі не співпадають')).toBeInTheDocument()
    })
  })
})
