import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { type LoginFormValues, signInDefaultValues } from '../constants'

import { Button } from '@/components/ui/button'
import Routes from '@/constants/routes'
import useUserStore from '@/hooks/store/use-user-store'
import { useToast } from '@/hooks/use-toast'
import { IconFormFieldFactory } from '@/patterns/abstract-factory/icon-form-field-factory'
import { AuthChain } from '@/patterns/chain-of-responsibility/auth-chain'

const SignInForm = () => {
  const { toast } = useToast()
  const { setUser } = useUserStore((state) => state)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: signInDefaultValues,
  })

  const formFieldFactory = new IconFormFieldFactory()

  const emailField = formFieldFactory.createEmailField()
  const passwordField = formFieldFactory.createPasswordField()

  const handleLogin = async (data: LoginFormValues) => {
    const authChain = new AuthChain(false)
    const response = await authChain.process(data)

    if (response.success && response.user) {
      setUser(response.user)
      router.replace(Routes.CATALOG)
    } else if (response.error) {
      toast({
        title: 'Помилка при вході',
        description: response.error,
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
      {emailField.render({
        id: 'login-email',
        registration: register('email'),
      })}
      {passwordField.render({
        id: 'login-password',
        registration: register('password'),
      })}

      <Button
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
