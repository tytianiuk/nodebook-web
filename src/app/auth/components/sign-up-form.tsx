import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import {
  signUpDefaultValues,
  type RegisterFormValues,
  registerSchema,
} from '../constants'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Routes from '@/constants/routes'
import useUserStore from '@/hooks/store/use-user-store'
import { useToast } from '@/hooks/use-toast'
import { AuthChain } from '@/patterns/chain-of-responsibility/auth-chain'

const SignUpForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: signUpDefaultValues,
  })
  const { setUser } = useUserStore((state) => state)
  const { toast } = useToast()

  const handleRegister = async (data: RegisterFormValues) => {
    const authChain = new AuthChain(true)
    const response = await authChain.process(data)

    if (response.success && response.user) {
      setUser(response.user)
      router.replace(Routes.CATALOG)
    } else if (response.error) {
      toast({
        title: 'Помилка при реєстрації',
        description: response.error,
        variant: 'destructive',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className='space-y-4'
      role='form'
    >
      <Input
        label="Ім'я"
        id='username'
        placeholder='Іван Петренко'
        error={errors.username?.message}
        {...register('username')}
      />
      <Input
        label='Email'
        id='email'
        type='text'
        placeholder='your@email.com'
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label='Пароль'
        id='password'
        type='password'
        placeholder='••••••••'
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label='Підтвердження паролю'
        id='confirm-password'
        type='password'
        placeholder='••••••••'
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button
        isLoading={isSubmitting}
        type='submit'
        className='w-full'
        data-testid='register-submit'
      >
        Зареєструватися
      </Button>
    </form>
  )
}

export default SignUpForm
