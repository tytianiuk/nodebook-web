import { Library, Phone } from 'lucide-react'

import Routes from '@/constants/routes'

export const menuItems = [
  { name: 'Каталог', href: Routes.CATALOG, icon: Library },
  { name: 'Контакти', href: Routes.CONTACTS, icon: Phone },
]
