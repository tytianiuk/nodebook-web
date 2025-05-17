'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ProfileCardView from '../presentational/profile-card-view'
import ProfileDialog from '../presentational/profile-dialog'

import profileAPI from '@/api/profile-api'
import Routes from '@/constants/routes'
import useUserStore from '@/hooks/store/use-user-store'
import { useToast } from '@/hooks/use-toast'
import type { User } from '@/types/user'
import { getNameAbbreviation } from '@/utils/user-utils'

interface ProfileCardContainerProps {
  user: User | null
}

const ProfileCardContainer = ({ user }: ProfileCardContainerProps) => {
  const { replace } = useRouter()
  const { setUser } = useUserStore((state) => state)
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleLogoutClick = () => {
    setIsDialogOpen(true)
  }

  const handleLogout = async () => {
    try {
      await profileAPI.logout()
      setIsDialogOpen(false)
      setUser(null)
      replace(Routes.CATALOG)
    } catch {
      toast({
        title: 'Помилка!',
        description: 'Не вдалось вийти з профілю. Повторіть спробу ще раз.',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <ProfileCardView
        user={user}
        getNameAbbreviation={getNameAbbreviation}
        onLogoutClick={handleLogoutClick}
      />
      <ProfileDialog
        isOpen={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  )
}

export default ProfileCardContainer
