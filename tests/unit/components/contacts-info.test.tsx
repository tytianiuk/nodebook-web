import { render, screen } from '@testing-library/react'

import ContactsInfo from '@/app/contacts/components/contacts-info'
import '@testing-library/jest-dom'

describe('ContactInfo Component', () => {
  test('renders contact information correctly', () => {
    render(<ContactsInfo />)

    expect(screen.getByText('Наші контакти')).toBeInTheDocument()

    expect(
      screen.getByText('вул. Книжкова, 123, м. Київ, 01001'),
    ).toBeInTheDocument()
    expect(screen.getByText('+38 (044) 123-45-67')).toBeInTheDocument()
    expect(screen.getByText('info@nodebook.com')).toBeInTheDocument()

    expect(screen.getAllByRole('img')).toHaveLength(3)
  })
})
