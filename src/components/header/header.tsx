import { SquareLibrary } from 'lucide-react'
import Link from 'next/link'

import Navigation from './navigation'

import ProfileButton from '@/components/header/profile-button'

const Header = () => {
  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Link href='/' className='flex-shrink-0 flex items-center'>
              <SquareLibrary
                data-testid='square-library'
                className='h-8 w-8 text-primary mr-2'
              />
              <span className='text-xl font-bold text-gray-800'>Nodebook</span>
            </Link>
          </div>
          <div className='flex gap-8'>
            <Navigation />
            <ProfileButton className='hidden sm:flex' />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
