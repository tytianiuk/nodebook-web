import { z } from 'zod'

export const PasswordData = {
  newPassword: '',
  confirmPassword: '',
}

export const passwordFormSchema = z
  .object({
    newPassword: z.string().min(8, 'Пароль повинен містити мінімум 8 символів'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  })

export type PasswordData = z.infer<typeof passwordFormSchema>
