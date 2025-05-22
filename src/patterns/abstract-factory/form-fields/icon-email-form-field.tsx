import { Mail } from 'lucide-react'
import type React from 'react'

import type { FormField, FormFieldProps } from '../form-field-interfaces'

import { IconInput } from '@/components/ui/icon-input'

export class IconEmailFormField implements FormField {
  render({
    id = 'email',
    label = 'Пошта',
    placeholder = 'your@email.com',
    error,
    registration,
    inputProps = {},
  }: FormFieldProps): React.JSX.Element {
    return (
      <IconInput
        icon={<Mail className='h-4 w-4 text-muted-foreground' />}
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
