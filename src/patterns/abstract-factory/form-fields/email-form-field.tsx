import type React from 'react'

import type { FormField, FormFieldProps } from '../form-field-interfaces'

import { Input } from '@/components/ui/input'

export class EmailFormField implements FormField {
  render({
    id = 'email',
    label = 'Пошта',
    placeholder = 'your@email.com',
    error,
    registration,
    inputProps = {},
  }: FormFieldProps): React.JSX.Element {
    return (
      <Input
        label={label}
        id={id}
        type='email'
        placeholder={placeholder}
        error={error}
        {...registration}
        {...inputProps}
      />
    )
  }
}
