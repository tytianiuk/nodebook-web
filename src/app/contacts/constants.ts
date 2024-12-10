import { z } from 'zod'

export const FormValues = {
  name: '',
  email: '',
  message: '',
}

export const FormValuesSchema = z.object({
  name: z.string().min(1, { message: 'Поле не може бути пустим' }),
  email: z.string().email({ message: 'Невірний формат email' }),
  message: z.string().min(10, { message: 'Мінімум 10 символів' }),
})

export type FormValues = z.infer<typeof FormValuesSchema>
