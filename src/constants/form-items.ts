import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const formItems = [
  { id: 'name', label: "Ім'я", component: Input, placeholder: 'Your name' },
  {
    id: 'email',
    label: 'Ел. пошта',
    component: Input,
    type: 'email',
    placeholder: 'your@email.com',
  },
  {
    id: 'message',
    label: 'Повідомлення',
    component: Textarea,
    placeholder: 'Your message',
    rows: 4,
  },
]
