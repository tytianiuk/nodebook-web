'use client'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { FC, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { menuItems } from '@/constants/header-items'

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const MenuItems = () => {
    return (
      <>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-4 sm:mb-0`}
            onClick={() => setIsOpen(false)}
            data-testid={item.name}
          >
            <item.icon className='h-5 w-5' />
            <span>{item.name}</span>
          </Link>
        ))}
      </>
    )
  }

  return (
    <>
      <nav className='hidden sm:flex sm:items-center sm:space-x-6'>
        <MenuItems />
      </nav>
      <div className='flex items-center sm:hidden'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon'>
              <span className='sr-only'>Відкрити меню</span>
              <Menu className='h-6 w-6' aria-hidden='true' />
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
            <SheetTitle>Меню</SheetTitle>
            <SheetHeader>
              <SheetDescription />
              <nav className='flex flex-col mt-6'>
                <MenuItems />
              </nav>
            </SheetHeader>
            <Link href='/auth'>
              <Button>Увійти</Button>
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
export default Navigation
