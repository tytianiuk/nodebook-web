'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { FC, PropsWithChildren, useEffect } from 'react'

import AuthAPI from '@/api/auth-api'
import { Toaster } from '@/components/ui/toaster'
import useUserStore from '@/hooks/store/use-user-store'

const queryClient = new QueryClient()

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const { user, setUser, setLoading } = useUserStore((state) => state)

  useEffect(() => {
    if (user === null) {
      setLoading(true)
      AuthAPI.getMe()
        .then((response) => {
          setUser(response)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        {children}
        <Toaster />
      </NuqsAdapter>
    </QueryClientProvider>
  )
}

export default Providers
