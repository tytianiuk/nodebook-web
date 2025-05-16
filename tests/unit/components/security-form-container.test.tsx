import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import profileAPI from '@/api/profile-api'
import SecurityFormContainer from '@/app/profile/components/containers/security-form-container'
import { Accordion } from '@/components/ui/accordion'

jest.mock('@/api/profile-api', () => ({
  changePassword: jest.fn(),
}))

describe('SecurityFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(
      <Accordion type='single' defaultValue='security'>
        <SecurityFormContainer />
      </Accordion>,
    )
  })

  it('submits form with valid data', async () => {
    ;(profileAPI.changePassword as jest.Mock).mockResolvedValue({})

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

  it('handles API error', async () => {
    ;(profileAPI.changePassword as jest.Mock).mockRejectedValue(
      new Error('API Error'),
    )

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
})
