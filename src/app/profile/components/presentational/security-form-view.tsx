'use client'

import type {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from 'react-hook-form'

import type { PasswordData } from '../../constants'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { passwordFormFields } from '@/constants/password-form-fields'

interface SecurityFormViewProps {
  register: UseFormRegister<PasswordData>
  handleSubmit: UseFormHandleSubmit<PasswordData>
  onSubmit: (data: PasswordData) => void
  errors: FieldErrors<PasswordData>
  isSubmitting: boolean
  allFieldsFilled: boolean
}

const SecurityFormView = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  allFieldsFilled,
}: SecurityFormViewProps) => {
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
          <Button
            type='submit'
            disabled={isSubmitting || !allFieldsFilled}
            role='form-button'
          >
            {isSubmitting ? 'Зміна паролю...' : 'Змінити пароль'}
          </Button>
        </form>
      </AccordionContent>
    </AccordionItem>
  )
}

export default SecurityFormView
