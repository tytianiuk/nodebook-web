import React from 'react'

import SocialLinks from './socialLinks'

interface FooterBlock {
  title: string
  content: string
}

const FooterBlock = ({ title, content }: FooterBlock) => {
  return (
    <div className='mb-4 md:mb-0'>
      <h2 className='text-lg font-semibold mb-2'>{title}</h2>
      {content === '<SocialLinks />' ? (
        <SocialLinks />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  )
}

export default FooterBlock
