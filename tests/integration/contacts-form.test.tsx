import { render, fireEvent, screen, act, waitFor } from '@testing-library/react'

import ContactsForm from '@/app/contacts/components/contacts-form'
import { formItems } from '@/constants/form-items'
const MockPage = () => (
  <div>
    <h1>Наші контакти</h1>
    <ContactsForm />
  </div>
)
describe('Contact Form Component - Integration Tests', () => {
  beforeEach(() => {
    render(<MockPage />)
  })

  it('should reset the form when submitted with valid data', async () => {
    fireEvent.change(screen.getByLabelText(formItems[0].label), {
      target: { value: 'Name' },
    })
    fireEvent.change(screen.getByLabelText(formItems[1].label), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(formItems[2].label), {
      target: { value: 'This is a test message with more than 20 characters.' },
    })
    const submitButton = screen.getByRole('button', { name: 'Відправити' })
    await act(async () => {
      fireEvent.click(submitButton)
    })
    await waitFor(() => {
      formItems.forEach(({ label }) => {
        const input = screen.getByLabelText(label)
        expect(input).toHaveValue('')
      })
    })
  })

  it('should not submit the form if only name is filled', async () => {
    fireEvent.change(screen.getByLabelText(formItems[0].label), {
      target: { value: 'Test Name' },
    })
    const submitButton = screen.getByRole('button', { name: 'Відправити' })
    await act(async () => {
      fireEvent.click(submitButton)
    })
    await waitFor(() => {
      const nameInput = screen.getByLabelText(formItems[0].label)
      expect(nameInput).not.toHaveValue('')
    })
  })

  it('should show error messages for all fields when submitting invalid data', async () => {
    fireEvent.change(screen.getByLabelText(formItems[1].label), {
      target: { value: 'test@example' },
    })
    const submitButton = screen.getByRole('button', { name: 'Відправити' })
    await act(async () => {
      fireEvent.click(submitButton)
    })
    await waitFor(() => {
      const nameError = screen.getByText('Поле не може бути пустим')
      const emailError = screen.getByText('Невірний формат email')
      const messageError = screen.getByText('Мінімум 10 символів')
      expect(nameError).toBeInTheDocument()
      expect(emailError).toBeInTheDocument()
      expect(messageError).toBeInTheDocument()
    })
  })
})
