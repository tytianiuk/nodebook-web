'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { PasswordData, passwordFormSchema } from '../../constants'
import SecurityFormView from '../presentational/security-form-view'

import profileAPI from '@/api/profile-api'
import { useToast } from '@/hooks/use-toast'

const SecurityFormContainer = () => {
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
    <SecurityFormView
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      allFieldsFilled={allFieldsFilled}
    />
  )
}

export default SecurityFormContainer
