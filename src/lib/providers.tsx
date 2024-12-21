'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { FC, PropsWithChildren } from 'react'

import { Toaster } from '@/components/ui/toaster'

const queryClient = new QueryClient()

const Providers: FC<PropsWithChildren> = ({ children }) => {
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
