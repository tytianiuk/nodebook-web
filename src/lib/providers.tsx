'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { FC, PropsWithChildren, useEffect } from 'react'

import LoadingPage from '@/components/loading-page'
import { Toaster } from '@/components/ui/toaster'
import useUserStore from '@/hooks/store/use-user-store'

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, loadUserFromStorage } = useUserStore((state) => state)

  useEffect(() => {
    loadUserFromStorage()
  }, [loadUserFromStorage])

  return (
    <NuqsAdapter>
      {isLoading ? <LoadingPage /> : children}
      <Toaster />
    </NuqsAdapter>
  )
}

export default Providers
