import type React from 'react'

import type { FormField, FormFieldProps } from '../form-field-interfaces'

import { Input } from '@/components/ui/input'

export class UserNameField implements FormField {
  render({
    id = 'username',
    label = "Ім'я",
    placeholder = 'Іван Петренко',
    error,
    registration,
    inputProps = {},
  }: FormFieldProps): React.JSX.Element {
    return (
      <Input
        label={label}
        id={id}
        type='text'
        placeholder={placeholder}
        error={error}
        {...registration}
        {...inputProps}
      />
    )
  }
}
