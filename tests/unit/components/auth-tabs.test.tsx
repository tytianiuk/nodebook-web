/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react'

import AuthTabs from '@/app/auth/components/auth-tabs'

jest.mock('@/app/auth/components/sign-in-form', () => () => (
  <div data-testid='mock-sign-in-form' />
))
jest.mock('@/app/auth/components/sign-up-form', () => () => (
  <div data-testid='mock-sign-up-form' />
))

describe('AuthTabs', () => {
  it('renders both tab buttons', () => {
    render(<AuthTabs />)

    expect(screen.getByRole('tab', { name: 'Вхід' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Реєстрація' })).toBeInTheDocument()
  })

  it('renders the sign-in form by default', () => {
    render(<AuthTabs />)

    expect(screen.getByTestId('mock-sign-in-form')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-sign-up-form')).not.toBeInTheDocument()
  })

  it('renders the tabs with correct accessibility attributes', () => {
    render(<AuthTabs />)

    const tabList = screen.getByRole('tablist')
    expect(tabList).toBeInTheDocument()
  })
})
