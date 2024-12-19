'use client'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { FC, PropsWithChildren } from 'react'

import { Toaster } from '@/components/ui/toaster'
const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NuqsAdapter>
      {children}
      <Toaster />
    </NuqsAdapter>
  )
}
export default Providers
