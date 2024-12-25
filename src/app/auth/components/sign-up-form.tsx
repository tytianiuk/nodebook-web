import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import {
  signUpDefaultValues,
  RegisterFormValues,
  registerSchema,
} from '../constants'

import AuthAPI from '@/api/auth-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Routes from '@/constants/routes'
import useUserStore from '@/hooks/store/use-user-store'
import { useToast } from '@/hooks/use-toast'
import { User } from '@/types/user'

const SignUpForm = () => {
  const { replace } = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: signUpDefaultValues,
  })
  const { setUser } = useUserStore((state) => state)
  const { toast } = useToast()

  const allFields = watch()

  const allFieldsFilled = Object.values(allFields).every((value) => value)

  const handleRegister = async (data: RegisterFormValues) => {
    const { username, password, email } = data
    try {
      const res = await AuthAPI.register(username, email, password)

      if (res.status === 201) {
        await AuthAPI.login(email, password)
        const response = await AuthAPI.getMe()
        const user = response.data as User
        setUser(user)
        replace(Routes.CATALOG)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch {
      toast({
        title: 'Помилка при вході',
        description: 'До цієї пошти вже прив`язаний обліковий запис',
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
        required
        {...register('username')}
      />
      <Input
        label='Email'
        id='email'
        type='email'
        placeholder='your@email.com'
        error={errors.email?.message}
        required
        {...register('email')}
      />
      <Input
        label='Пароль'
        id='password'
        type='password'
        placeholder='••••••••'
        error={errors.password?.message}
        required
        {...register('password')}
      />
      <Input
        label='Підтвердження паролю'
        id='confirm-password'
        type='password'
        placeholder='••••••••'
        error={errors.confirmPassword?.message}
        required
        {...register('confirmPassword')}
      />
      <Button
        disabled={!allFieldsFilled}
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
