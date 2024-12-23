'use client'

import { useState } from 'react'

import SignInForm from './sign-in-form'
import SignUpForm from './sign-up-form'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='login' data-testid='login'>
          Вхід
        </TabsTrigger>
        <TabsTrigger value='register' data-testid='register'>
          Реєстрація
        </TabsTrigger>
      </TabsList>
      <TabsContent value='login'>
        <SignInForm />
      </TabsContent>
      <TabsContent value='register'>
        <SignUpForm />
      </TabsContent>
    </Tabs>
  )
}

export default AuthTabs
