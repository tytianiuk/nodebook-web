'use client'
import Link from 'next/link'
import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Routes from '@/constants/routes'
import useUserStore from '@/hooks/store/use-user-store'
import { cn } from '@/utils/style-utils'
import { getNameAbbreviation } from '@/utils/user-utils'
interface ProfileButtonProps {
  className?: string
}
const ProfileButton: FC<ProfileButtonProps> = ({ className }) => {
  const { user } = useUserStore((state) => state)
  const nameAbbreviation = getNameAbbreviation(user?.username || '')
  return (
    <>
      {!user ? (
        <Link className={className} href={Routes.AUTH}>
          <Button>Увійти</Button>
        </Link>
      ) : (
        <Link
          className={cn(className, 'items-center gap-2')}
          href={Routes.PROFILE}
        >
          <Avatar>
            <AvatarImage />
            <AvatarFallback>{nameAbbreviation}</AvatarFallback>
          </Avatar>
          <span>{user.username}</span>
        </Link>
      )}
    </>
  )
}
export default ProfileButton
