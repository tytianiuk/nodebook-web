import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import Footer from '@/components/footer/footer'
import FooterBlock from '@/components/footer/footerBlock'
import SocialLinks from '@/components/footer/socialLinks'
import { footerBlocks } from '@/constants/footer-blocks'
import { socialLinks } from '@/constants/social-links'

describe('Footer Component - Unit Tests', () => {
  it('renders all footer blocks', () => {
    render(<Footer />)
    footerBlocks.forEach((block) => {
      const titleElement = screen.getByText(block.title)
      expect(titleElement).toBeInTheDocument()
    })
  })

  it('renders copyright text', () => {
    render(<Footer />)
    const copyrightText = screen.getByText(/© 2024 Nodebook./i)
    expect(copyrightText).toBeInTheDocument()
  })
})

describe('FooterBlock Component - Unit Tests', () => {
  it('renders the title correctly', () => {
    render(<FooterBlock title='Test Title' content='<p>Test Content</p>' />)
    const titleElement = screen.getByText('Test Title')
    expect(titleElement).toBeInTheDocument()
  })

  it('renders content as HTML when provided', () => {
    render(<FooterBlock title='Test Title' content='<p>Test Content</p>' />)
    const contentElement = screen.getByText('Test Content')
    expect(contentElement).toBeInTheDocument()
  })

  it('renders the SocialLinks component when content is <SocialLinks />', () => {
    render(<FooterBlock title='Соцмережі' content='<SocialLinks />' />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(socialLinks.length)
  })
})

describe('SocialLinks Component - Unit Tests', () => {
  it('renders all social links', () => {
    render(<SocialLinks />)
    socialLinks.forEach((link) => {
      const iconElement = screen.getByRole('link', { name: link.label })
      expect(iconElement).toHaveAttribute('href', link.href)
    })
  })
})
