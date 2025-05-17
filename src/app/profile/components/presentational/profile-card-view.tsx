'use client'

import { LogOut, Mail } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { User } from '@/types/user'

interface ProfileCardViewProps {
  user: User | null
  getNameAbbreviation: (name: string) => string
  onLogoutClick: () => void
}

const ProfileCardView = ({
  user,
  getNameAbbreviation,
  onLogoutClick,
}: ProfileCardViewProps) => {
  return (
    <Card className='w-full lg:w-1/3 h-fit'>
      <CardHeader>
        <div className='flex flex-col items-center'>
          <Avatar className='w-24 h-24'>
            {user ? (
              <>
                {' '}
                <AvatarImage />
                <AvatarFallback>
                  {getNameAbbreviation(user!.username)}
                </AvatarFallback>
              </>
            ) : (
              <Skeleton className='w-full h-full rounded-full' />
            )}
          </Avatar>
          <CardTitle className='mt-4'>
            {user ? user.username : <Skeleton className='h-6 w-32' />}
          </CardTitle>
          <CardDescription className='text-center'>
            <div className='flex items-center justify-center mt-2'>
              <Mail className='w-4 h-4 mr-2' />
              {user ? user.email : <Skeleton className='h-4 w-40' />}
            </div>
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className='flex flex-col gap-4'>
        <Button
          variant='destructive'
          onClick={onLogoutClick}
          className={`w-full text-primary-foreground hover:bg-red-400 bg-red-600`}
          disabled={!user}
        >
          <LogOut className='mr-2 h-4 w-4' />
          Вийти з профілю
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProfileCardView
