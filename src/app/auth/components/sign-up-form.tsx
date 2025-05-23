import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import {
  signUpDefaultValues,
  type RegisterFormValues,
  registerSchema,
} from '../constants'

import { Button } from '@/components/ui/button'
import Routes from '@/constants/routes'
import useUserStore from '@/hooks/store/use-user-store'
import { useToast } from '@/hooks/use-toast'
import { DefaultFormFieldFactory } from '@/patterns/abstract-factory/form-field-factory'
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

  const formFieldFactory = new DefaultFormFieldFactory()

  const usernameField = formFieldFactory.createUserNameField()
  const emailField = formFieldFactory.createEmailField()
  const passwordField = formFieldFactory.createPasswordField()

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
      {usernameField.render({
        registration: register('username'),
        error: errors.username?.message,
      })}

      {emailField.render({
        registration: register('email'),
        error: errors.email?.message,
      })}

      {passwordField.render({
        registration: register('password'),
        error: errors.password?.message,
      })}

      {passwordField.render({
        id: 'confirm-password',
        label: 'Підтвердження паролю',
        registration: register('confirmPassword'),
        error: errors.confirmPassword?.message,
      })}
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
