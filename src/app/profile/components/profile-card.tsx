'use client'

import { LogOut, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import ProfileDialog from './profile-dialog'

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
import Routes from '@/constants/routes'
import { User } from '@/types/user'
import { getNameAbbreviation } from '@/utils/user-utils'

const ProfileCard = ({ user }: { user: User }) => {
  const nameAbbreviation = getNameAbbreviation(user?.username || '')
  const { replace } = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  return (
    <>
      <Card className='w-full lg:w-1/3 h-fit'>
        <CardHeader>
          <div className='flex flex-col items-center'>
            <Avatar className='w-24 h-24'>
              {user ? (
                <AvatarImage />
              ) : (
                <Skeleton className='w-full h-full rounded-full' />
              )}
              <AvatarFallback>{nameAbbreviation}</AvatarFallback>
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
            onClick={() => setIsDialogOpen(true)}
            className='w-full'
            disabled={!user}
          >
            <LogOut className='mr-2 h-4 w-4' />
            Вийти з профілю
          </Button>
        </CardFooter>
      </Card>

      <ProfileDialog
        isOpen={isDialogOpen}
        onOpenChange={(value) => setIsDialogOpen(value)}
        onConfirm={async () => {
          setIsDialogOpen(false)
          replace(Routes.CATALOG)
        }}
      />
    </>
  )
}

export default ProfileCard
