import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { LoginFormValues, signInDefaultValues } from '../constants'

import AuthAPI from '@/api/auth-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import errorMessages from '@/constants/error-messages'
import Routes from '@/constants/routes'
import useUserStore from '@/hooks/store/use-user-store'
import { useToast } from '@/hooks/use-toast'

const SignInForm = () => {
  const { toast } = useToast()
  const { setUser } = useUserStore((state) => state)
  const { replace } = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: signInDefaultValues,
  })

  const allFields = watch()

  const allFieldsFilled = Object.values(allFields).every((value) => value)

  const handleLogin = async (data: LoginFormValues) => {
    const { email, password } = data

    try {
      await AuthAPI.login(email, password)
      const user = await AuthAPI.getMe()
      setUser(user)
      replace(Routes.CATALOG)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { title, description } = errorMessages[error.status] || {
        title: 'Помилка при вході',
        description: 'Сталася невідома помилка. Спробуйте пізніше.',
      }

      toast({
        title,
        description,
        variant: 'destructive',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className='space-y-4'
      role='form'
    >
      <Input
        label='Email'
        id='login-email'
        type='text'
        placeholder='your@email.com'
        required
        {...register('email')}
      />
      <Input
        label='Пароль'
        id='login-password'
        type='password'
        placeholder='••••••••'
        required
        {...register('password')}
      />
      <Button
        disabled={!allFieldsFilled}
        isLoading={isSubmitting}
        type='submit'
        className='w-full'
        data-testid='login-submit'
      >
        Увійти
      </Button>
    </form>
  )
}

export default SignInForm
