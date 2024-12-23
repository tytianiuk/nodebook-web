'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormValues, FormValuesSchema } from '../constants'

import ContactsAPI from '@/api/contacts-api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormValuesSchema),
    defaultValues: FormValues,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (!user) {
      setIsDialogOpen(true)
      return
    }
    setIsSubmitting(true)
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
    } finally {
      setIsSubmitting(false)
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
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Відправляється...' : 'Відправити'}
        </Button>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Увійдіть або створіть обліковий запис</DialogTitle>
            <DialogDescription>
              Для відправки повідомлення необхідно увійти або створити обліковий
              запис.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-4 mt-4'>
            <Button variant='outline' onClick={handleCloseDialog}>
              Увійти
            </Button>
            <Button onClick={handleCloseDialog}>
              Створити обліковий запис
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ContactsForm
