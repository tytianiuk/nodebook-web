export const passwordFormFields = [
  {
    id: 'newPassword' as const,
    label: 'Новий пароль',
    type: 'password',
    required: true,
  },
  {
    id: 'confirmPassword' as const,
    label: 'Підтвердження нового пароля',
    type: 'password',
    required: true,
  },
]
