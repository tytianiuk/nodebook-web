import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  signUpDefaultValues,
  RegisterFormValues,
  registerSchema,
} from '../constants'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: signUpDefaultValues,
  })

  const allFields = watch()

  const allFieldsFilled = Object.values(allFields).every((value) => value)

  const handleRegister = async (data: RegisterFormValues) => console.log(data)

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className='space-y-4'
      role='form'
    >
      <Input
        label="Ім'я"
        id='fullName'
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
