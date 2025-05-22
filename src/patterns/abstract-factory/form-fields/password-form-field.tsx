import type React from 'react'

import type { FormField, FormFieldProps } from '../form-field-interfaces'

import { Input } from '@/components/ui/input'

export class PasswordFormField implements FormField {
  render({
    id = 'password',
    label = 'Пароль',
    placeholder = '••••••••',
    error,
    registration,
    inputProps = {},
  }: FormFieldProps): React.JSX.Element {
    return (
      <Input
        label={label}
        id={id}
        type='password'
        placeholder={placeholder}
        error={error}
        {...registration}
        {...inputProps}
      />
    )
  }
}
