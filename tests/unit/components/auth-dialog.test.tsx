import { render, screen, fireEvent } from '@testing-library/react'

import AuthDialog from '@/app/contacts/components/auth-dialog'

describe('AuthDialog', () => {
  const mockOnOpenChange = jest.fn()
  const mockOnClose = jest.fn()

  it('renders correctly when open', () => {
    render(
      <AuthDialog
        isOpen={true}
        onOpenChange={mockOnOpenChange}
        onClose={mockOnClose}
      />,
    )

    expect(
      screen.getByText('Увійдіть або створіть обліковий запис'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Для відправки повідомлення необхідно увійти або створити обліковий запис.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('Увійти')).toBeInTheDocument()
    expect(screen.getByText('Створити обліковий запис')).toBeInTheDocument()
  })

  it('calls onClose when "Увійти" button is clicked', () => {
    render(
      <AuthDialog
        isOpen={true}
        onOpenChange={mockOnOpenChange}
        onClose={mockOnClose}
      />,
    )

    fireEvent.click(screen.getByText('Увійти'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when "Створити обліковий запис" button is clicked', () => {
    render(
      <AuthDialog
        isOpen={true}
        onOpenChange={mockOnOpenChange}
        onClose={mockOnClose}
      />,
    )

    fireEvent.click(screen.getByText('Створити обліковий запис'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
