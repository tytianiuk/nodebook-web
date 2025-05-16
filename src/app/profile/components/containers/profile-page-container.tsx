'use client'

import ProfilePageView from '../presentational/profile-page-view'

import useUserStore from '@/hooks/store/use-user-store'

const ProfilePageContainer = () => {
  const { user } = useUserStore((state) => state)

  return <ProfilePageView user={user} />
}

export default ProfilePageContainer
