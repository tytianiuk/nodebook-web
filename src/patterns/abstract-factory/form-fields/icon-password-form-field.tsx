'use client'

import { Lock, Eye, EyeOff } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

import type { FormField, FormFieldProps } from '../form-field-interfaces'

import { IconInput } from '@/components/ui/icon-input'

export class IconPasswordFormField implements FormField {
  render({
    id = 'password',
    label = 'Пароль',
    placeholder = '••••••••',
    error,
    registration,
    inputProps = {},
  }: FormFieldProps): React.JSX.Element {
    const PasswordFieldWithToggle = () => {
      const [showPassword, setShowPassword] = useState(false)

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
      }

      const EyeIcon = showPassword ? (
        <Eye
          className='h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors'
          onClick={togglePasswordVisibility}
        />
      ) : (
        <EyeOff
          className='h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors'
          onClick={togglePasswordVisibility}
        />
      )

      return (
        <IconInput
          icon={<Lock className='h-4 w-4 text-muted-foreground' />}
          rightIcon={EyeIcon}
          label={label}
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          error={error}
          {...registration}
          {...inputProps}
        />
      )
    }

    return <PasswordFieldWithToggle />
  }
}
