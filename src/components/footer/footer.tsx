import FooterBlock from './footerBlock'

import { footerBlocks } from '@/constants/footer-blocks'
const Footer = () => {
  return (
    <footer className='bg-white shadow-inner py-8'>
      <div className='container mx-auto px-4 w-4/5'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          {footerBlocks.map((block, index) => (
            <FooterBlock
              key={index}
              title={block.title}
              content={block.content}
            />
          ))}
        </div>
        <div className='mt-8 text-center'>
          <p>&copy; 2024 Nodebook.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
