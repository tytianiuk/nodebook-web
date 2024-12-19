import { useForm } from 'react-hook-form'

import { LoginFormValues, signInDefaultValues } from '../constants'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SignInForm = () => {
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
    console.log(data)
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
