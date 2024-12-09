import Link from 'next/link'

import { socialLinks } from '@/constants/social-links'

const SocialLinks = () => {
  return (
    <div className='flex space-x-4 justify-center'>
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <Link key={label} href={href} className='hover:text-gray-600'>
          <Icon size={24} />
          <span className='sr-only'>{label}</span>
        </Link>
      ))}
    </div>
  )
}

export default SocialLinks
