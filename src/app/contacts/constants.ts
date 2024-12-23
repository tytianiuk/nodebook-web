import { z } from 'zod'

export const FormValues = {
  subject: '',
  message: '',
}

export const FormValuesSchema = z.object({
  subject: z
    .string()
    .min(5, { message: 'Мінімум 5 символів' })
    .max(50, { message: 'Максимум 50 символів' }),
  message: z.string().min(10, { message: 'Мінімум 10 символів' }),
})

export type FormValues = z.infer<typeof FormValuesSchema>
