'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PasswordData, passwordFormSchema } from '../constants'

import profileAPI from '@/api/profile-api'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { passwordFormFields } from '@/constants/password-form-fields'
import { useToast } from '@/hooks/use-toast'

const SecurityForm = () => {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<PasswordData>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: PasswordData,
  })

  const allFields = watch()
  const allFieldsFilled =
    allFields && Object.values(allFields).every((value) => value)

  const onSubmit: SubmitHandler<PasswordData> = async (data: PasswordData) => {
    const { newPassword } = data
    try {
      await profileAPI.changePassword(newPassword)
      toast({
        title: 'Успішно!',
        description: 'Ваш пароль було змінено.',
        variant: 'default',
      })
      reset()
    } catch {
      toast({
        title: 'Помилка!',
        description: 'Не вдалося змінити пароль. Спробуйте ще раз.',
        variant: 'destructive',
      })
    }
  }
  return (
    <AccordionItem value='security'>
      <AccordionTrigger className='px-2'>Безпека</AccordionTrigger>
      <AccordionContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 px-2'
          role='form'
        >
          {passwordFormFields.map((field) => (
            <Input
              label={field.label}
              id={field.label}
              key={field.id}
              type={field.type}
              required={field.required}
              error={errors[field.id]?.message}
              {...register(field.id)}
            />
          ))}
          <Button type='submit' disabled={isSubmitting || !allFieldsFilled}>
            {isSubmitting ? 'Зміна паролю...' : 'Змінити пароль'}
          </Button>
        </form>
      </AccordionContent>
    </AccordionItem>
  )
}

export default SecurityForm
