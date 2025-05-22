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
import { FormField } from '@/patterns/abstract-factory/form-field-interfaces'

interface SecurityFormViewProps {
  register: UseFormRegister<PasswordData>
  handleSubmit: UseFormHandleSubmit<PasswordData>
  onSubmit: (data: PasswordData) => void
  errors: FieldErrors<PasswordData>
  isSubmitting: boolean
  allFieldsFilled: boolean
  passwordField: FormField
}

const SecurityFormView = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  allFieldsFilled,
  passwordField,
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
          {passwordField.render({
            label: 'Новий пароль',
            registration: register('newPassword'),
            error: errors.newPassword?.message,
          })}

          {passwordField.render({
            id: 'confirm-password',
            label: 'Підтвердження нового пароля',
            registration: register('confirmPassword'),
            error: errors.confirmPassword?.message,
          })}
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
