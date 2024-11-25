import { beforeEach, describe, expect, it } from '@jest/globals'
import { render, screen, within } from '@testing-library/react'

import Footer from '@/components/footer/footer'
import FooterBlock from '@/components/footer/footerBlock'
import { footerBlocks } from '@/constants/footer-blocks'

describe('Footer Component - Integration Tests', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it('renders all footer blocks with correct titles', () => {
    footerBlocks.forEach((block) => {
      const title = screen.getByText(block.title)
      expect(title).toBeInTheDocument()
    })
  })

  it('renders social links block when content is <SocialLinks />', () => {
    const socialBlock = footerBlocks.find(
      (block) => block.content === '<SocialLinks />',
    )
    expect(socialBlock).toBeDefined()

    const socialTitle = screen.getByText(socialBlock!.title)
    const socialLinks = within(socialTitle.closest('div')!).getAllByRole('link')
    expect(socialLinks.length).toBe(3)
  })

  it('renders correct contact information in the contacts block', () => {
    const contactsBlock = footerBlocks.find(
      (block) => block.title === 'Контакти',
    )
    expect(contactsBlock).toBeDefined()

    const contactsTitle = screen.getByText(contactsBlock!.title)
    expect(contactsTitle).toBeInTheDocument()

    const email = screen.getByText(/nodebook@gmail.com/i)
    expect(email).toBeInTheDocument()

    const phone = screen.getByText(/\+380 44 123 45 67/i)
    expect(phone).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    const copyright = screen.getByText(/© 2024 Nodebook/i)
    expect(copyright).toBeInTheDocument()
  })
})

describe('FooterBlock Component - Integration Tests', () => {
  it('renders title and content correctly', () => {
    const block = footerBlocks[0]
    render(<FooterBlock title={block.title} content={block.content} />)

    const blockTitle = screen.getByText(block.title)
    expect(blockTitle).toBeInTheDocument()

    const contentElement = screen.getByText(
      /Ваше джерело літературних дискусій/i,
    )
    expect(contentElement).toBeInTheDocument()
  })

  it('renders SocialLinks component when content is <SocialLinks />', () => {
    const socialLinkBlock = footerBlocks.find(
      (block) => block.content === '<SocialLinks />',
    )
    render(
      <FooterBlock
        title={socialLinkBlock!.title}
        content={socialLinkBlock!.content}
      />,
    )

    const socialLinks = screen.getAllByRole('link')
    expect(socialLinks.length).toBeGreaterThan(0)
  })
})

describe('SocialLinks Component - Integration Tests', () => {
  it('renders all social links with correct hrefs', () => {
    render(<Footer />)

    const socialLinks = screen.getAllByRole('link')
    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute('href')
    })
  })
})
