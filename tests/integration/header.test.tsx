import { beforeEach, describe, expect, it } from '@jest/globals'
import { render, screen, fireEvent, within } from '@testing-library/react'

import Header from '@/components/header/header'
import Navigation from '@/components/header/navigation'
import { menuItems } from '@/constants/header-items'

describe('Header Component - Integration Tests', () => {
  beforeEach(() => {
    render(<Header />)
  })

  it('should render the logo link with correct href', () => {
    const logoLink = screen.getByRole('link', { name: /Nodebook/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('should render the navigation component within Header', () => {
    const navigation = screen.getByRole('navigation')
    expect(navigation).toBeInTheDocument()
  })
})

describe('Navigation Component - Integration Tests', () => {
  beforeEach(() => {
    render(<Navigation />)
  })

  it('opens and closes the mobile menu', () => {
    const menuButton = screen.getByRole('button', { name: /відкрити меню/i })
    fireEvent.click(menuButton)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    fireEvent.click(menuButton)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes mobile menu when clicking a navigation link', () => {
    const menuButton = screen.getByRole('button', { name: /відкрити меню/i })
    fireEvent.click(menuButton)
    const dialog = screen.getByRole('dialog')

    const firstLink = within(dialog).getByText(menuItems[0].name)
    fireEvent.click(firstLink)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('verifies each navigation link has correct href in desktop view', () => {
    const desktopNav = screen.getByRole('navigation')
    menuItems.forEach((item) => {
      const link = within(desktopNav).getByText(item.name).closest('a')
      expect(link).toHaveAttribute('href', item.href)
    })
  })

  it('verifies each navigation link has correct href in mobile view', () => {
    const menuButton = screen.getByRole('button', { name: /відкрити меню/i })
    fireEvent.click(menuButton)
    const dialog = screen.getByRole('dialog')

    menuItems.forEach((item) => {
      const link = within(dialog).getByText(item.name).closest('a')
      expect(link).toHaveAttribute('href', item.href)
    })
  })
})
