'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormValues, FormValuesSchema } from '../constants'

import AuthDialog from './auth-dialog'

import ContactsAPI from '@/api/contacts-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Routes from '@/constants/routes'
import useUserStore from '@/hooks/store/use-user-store'
import { useToast } from '@/hooks/use-toast'

const ContactsForm = () => {
  const { toast } = useToast()
  const { replace } = useRouter()
  const { user } = useUserStore((state) => state)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(FormValuesSchema),
    defaultValues: FormValues,
  })

  const allFields = watch()

  const allFieldsFilled = Object.values(allFields).every((value) => value)

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (!user) {
      setIsDialogOpen(true)
      return
    }
    const { subject, message } = data
    try {
      await ContactsAPI.sendMessage(subject, message)
      toast({
        title: 'Успішно відправлено!',
        description: 'Ваше повідомлення було успішно відправлено.',
        variant: 'default',
      })
      replace(Routes.CATALOG)
    } catch {
      toast({
        title: 'Помилка!',
        description:
          'Виникла помилка при відправці повідомлення. Спробуйте ще раз.',
        variant: 'destructive',
      })
    }
  }

  const handleInputFocus = () => {
    if (!user) {
      setIsDialogOpen(true)
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    replace(Routes.AUTH)
  }

  return (
    <>
      <form
        className='w-full space-y-6'
        role='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor='subject' className='block mb-2 text-sm font-medium'>
            Тема
          </label>
          <Input
            id='subject'
            {...register('subject')}
            placeholder='Введіть тему повідомлення'
            onFocus={handleInputFocus}
          />
          {errors.subject && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.subject.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor='message' className='block mb-2 text-sm font-medium'>
            Повідомлення
          </label>
          <Textarea
            id='message'
            {...register('message')}
            placeholder='Введіть ваше повідомлення'
            onFocus={handleInputFocus}
          />
          {errors.message && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.message.message}
            </p>
          )}
        </div>
        <Button
          type='submit'
          className='w-full bg-black text-white hover:bg-gray-800'
          disabled={!allFieldsFilled || isSubmitting}
          isLoading={isSubmitting}
        >
          Відправити
        </Button>
      </form>

      <AuthDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  )
}

export default ContactsForm
