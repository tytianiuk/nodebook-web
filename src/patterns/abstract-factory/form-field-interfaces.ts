import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export interface FormField {
  render: (props: FormFieldProps) => JSX.Element
}

export interface FormFieldProps {
  id?: string
  label?: string
  placeholder?: string
  error?: string
  registration: UseFormRegisterReturn
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export interface FormFieldFactory {
  createUserNameField(): FormField
  createEmailField(): FormField
  createPasswordField(): FormField
}
