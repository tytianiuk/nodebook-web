import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'

import ContactsAPI from '@/api/contacts-api'
import ContactsForm from '@/app/contacts/components/contacts-form'
import useUserStore from '@/hooks/store/use-user-store'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))
jest.mock('@/hooks/store/use-user-store', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    user: null,
    setUser: jest.fn(),
  })),
}))
jest.mock('@/api/contacts-api', () => ({
  sendMessage: jest.fn(),
}))

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe('ContactsForm', () => {
  const mockReplace = jest.fn()
  const mockUser = { id: '1', name: 'Test User' }

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ replace: mockReplace })
    ;(useUserStore as unknown as jest.Mock).mockImplementation(() => ({
      user: mockUser,
    }))
  })

  it('renders form fields correctly', () => {
    render(<ContactsForm />)

    expect(screen.getByLabelText('Тема')).toBeInTheDocument()
    expect(screen.getByLabelText('Повідомлення')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Відправити' }),
    ).toBeInTheDocument()
  })

  it('displays error messages for invalid input', async () => {
    render(<ContactsForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Відправити' }))

    await waitFor(() => {
      expect(screen.getByText('Мінімум 5 символів')).toBeInTheDocument()
      expect(screen.getByText('Мінімум 10 символів')).toBeInTheDocument()
    })
  })

  it('submits the form with valid input', async () => {
    render(<ContactsForm />)

    fireEvent.change(screen.getByLabelText('Тема'), {
      target: { value: 'Test Subject' },
    })
    fireEvent.change(screen.getByLabelText('Повідомлення'), {
      target: { value: 'This is a test message' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Відправити' }))

    await waitFor(() => {
      expect(ContactsAPI.sendMessage).toHaveBeenCalledWith(
        'Test Subject',
        'This is a test message',
      )
    })
  })
})
