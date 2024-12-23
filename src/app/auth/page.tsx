import { FC } from 'react'

import AuthTabs from './components/auth-tabs'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const Auth: FC = () => {
  return (
    <div className='h-[80%] grid place-items-center'>
      <Card className='mx-auto w-full max-w-md'>
        <CardHeader>
          <CardTitle>Вхід / Реєстрація</CardTitle>
          <CardDescription>
            Увійдіть в свій обліковий запис або створіть новий
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthTabs />
        </CardContent>
        <CardFooter className='flex justify-center'>
          <p className='text-sm text-muted-foreground'>
            Натискаючи &#34;Увійти&#34; або &#34;Зареєструватися&#34;, ви
            погоджуєтесь з нашими Умовами використання та Політикою
            конфіденційності.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Auth
