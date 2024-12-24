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

const mockToast = jest.fn()
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}))

describe('ContactsForm Integration', () => {
  const mockReplace = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ replace: mockReplace })
  })

  it('shows AuthDialog when user is not logged in and tries to interact with form', async () => {
    ;(useUserStore as unknown as jest.Mock).mockImplementation(() => ({
      user: null,
    }))

    render(<ContactsForm />)

    fireEvent.focus(screen.getByLabelText('Тема'))

    await waitFor(() => {
      expect(
        screen.getByText('Увійдіть або створіть обліковий запис'),
      ).toBeInTheDocument()
    })
  })

  it('allows form submission when user is logged in', async () => {
    const mockUser = { id: '1', name: 'Test User' }
    ;(useUserStore as unknown as jest.Mock).mockImplementation(() => ({
      user: mockUser,
    }))
    ;(ContactsAPI.sendMessage as jest.Mock).mockResolvedValue({})

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
      expect(mockReplace).toHaveBeenCalled()
    })
  })

  it('handles API errors during form submission', async () => {
    const mockUser = { id: '1', name: 'Test User' }
    ;(useUserStore as unknown as jest.Mock).mockImplementation(() => ({
      user: mockUser,
    }))
    ;(ContactsAPI.sendMessage as jest.Mock).mockRejectedValue(
      new Error('API Error'),
    )

    render(<ContactsForm />)

    fireEvent.change(screen.getByLabelText('Тема'), {
      target: { value: 'Test Subject' },
    })
    fireEvent.change(screen.getByLabelText('Повідомлення'), {
      target: { value: 'This is a test message' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Відправити' }))

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Помилка!',
        description:
          'Виникла помилка при відправці повідомлення. Спробуйте ще раз.',
        variant: 'destructive',
      })
    })
  })
})
