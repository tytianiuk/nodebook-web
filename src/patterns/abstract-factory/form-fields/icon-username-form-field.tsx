import { User } from 'lucide-react'
import type React from 'react'

import type { FormField, FormFieldProps } from '../form-field-interfaces'

import { IconInput } from '@/components/ui/icon-input'

export class IconUserNameField implements FormField {
  render({
    id = 'username',
    label = "Ім'я",
    placeholder = 'Іван Петренко',
    error,
    registration,
    inputProps = {},
  }: FormFieldProps): React.JSX.Element {
    return (
      <IconInput
        icon={<User className='h-4 w-4 text-muted-foreground' />}
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
