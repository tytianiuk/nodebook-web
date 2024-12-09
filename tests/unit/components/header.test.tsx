import { beforeEach, describe, expect, it } from '@jest/globals'
import { fireEvent, render, screen, within } from '@testing-library/react'

import '@testing-library/jest-dom'
import Header from '@/components/header/header'
import Navigation from '@/components/header/navigation'
import { menuItems } from '@/constants/header-items'

describe('Header Component - Unit Tests', () => {
  beforeEach(() => {
    render(<Header />)
  })

  it('renders the logo link with correct href', () => {
    const logoLink = screen.getByRole('link', { name: /Nodebook/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders the company name', () => {
    const companyName = screen.getByText('Nodebook')
    expect(companyName).toBeInTheDocument()
  })

  it('renders the SquareLibrary icon', () => {
    const icon = screen.getByTestId('square-library')
    expect(icon).toBeInTheDocument()
  })

  it('renders the navigation component', () => {
    const navigation = screen.getByRole('navigation', { hidden: true })
    expect(navigation).toBeInTheDocument()
  })

  it('renders the login button', () => {
    const loginButton = screen.getByRole('link', { name: /увійти/i })
    expect(loginButton).toHaveAttribute('href', '/auth')
  })
})
describe('Navigation Component - Unit Tests', () => {
  beforeEach(() => {
    render(<Navigation />)
  })

  it('renders all menu items for desktop view', () => {
    const desktopNav = screen.getByRole('navigation', { hidden: true })
    menuItems.forEach((item) => {
      const link = within(desktopNav).getByText(item.name)
      expect(link).toBeInTheDocument()
      expect(link.closest('a')).toHaveAttribute('href', item.href)
    })
  })

  it('renders correct icons for each menu item', () => {
    const desktopNav = screen.getByRole('navigation', { hidden: true })
    menuItems.forEach((item) => {
      const link = within(desktopNav).getByText(item.name).closest('a')
      const icon = link?.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })
  })

  it('renders all menu items in the mobile menu', () => {
    const menuButton = screen.getByRole('button', { name: /відкрити меню/i })
    fireEvent.click(menuButton)
    const dialog = screen.getByRole('dialog')
    menuItems.forEach((item) => {
      const link = within(dialog).getByText(item.name)
      expect(link).toBeInTheDocument()
      expect(link.closest('a')).toHaveAttribute('href', item.href)
    })
  })

  it('renders the login button in the mobile menu', () => {
    const menuButton = screen.getByRole('button', { name: /відкрити меню/i })
    fireEvent.click(menuButton)
    const dialog = screen.getByRole('dialog')
    const loginButton = within(dialog).getByText('Увійти')
    expect(loginButton).toBeInTheDocument()
    expect(loginButton.closest('a')).toHaveAttribute('href', '/auth')
  })
})
