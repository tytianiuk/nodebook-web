'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormValues, FormValuesSchema } from '../constants'

import { Button } from '@/components/ui/button'
import { formItems } from '@/constants/form-items'
import { useToast } from '@/hooks/use-toast'

const ContactsForm = () => {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormValuesSchema),
    defaultValues: FormValues,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async () => {
    setIsSubmitting(true)
    try {
      toast({
        title: 'Успішно відправлено!',
        description: 'Ваше повідомлення було успішно відправлено.',
        variant: 'default',
      })
      reset()
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

  return (
    <form
      className='w-full space-y-6'
      role='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      {formItems.map(({ id, label, component: Component, ...props }) => {
        return (
          <div key={id}>
            <label htmlFor={id} className='block mb-2 text-sm font-medium'>
              {label}
            </label>
            <Component
              id={id}
              {...register(id as keyof FormValues, {})}
              {...props}
            />
            {errors[id as keyof FormValues] && (
              <p className='mt-1 text-sm text-red-600'>
                {errors[id as keyof FormValues]?.message}
              </p>
            )}
          </div>
        )
      })}
      <Button
        type='submit'
        className='w-full bg-black text-white hover:bg-gray-800'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Відправляється...' : 'Відправити'}
      </Button>
    </form>
  )
}

export default ContactsForm
