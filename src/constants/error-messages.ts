const errorMessages: Record<number, { title: string; description: string }> = {
  400: {
    title: 'Невірні дані',
    description: 'Перевірте правильність введених даних.',
  },
  404: {
    title: 'Невірні дані',
    description: 'Перевірте правильність введених даних.',
  },
  409: {
    title: 'Конфлікт',
    description: 'Можливо профіль з цією поштою вже створений.',
  },
  500: {
    title: 'Помилка сервера',
    description: 'Щось пішло не так. Спробуйте пізніше.',
  },
}

export default errorMessages
