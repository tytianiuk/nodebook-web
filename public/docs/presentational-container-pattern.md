# **Container/Presentational Pattern**🛡️ | [profile-page з кодом](../../src/app/profile/components/)

## Контекст проблеми 📝

При розробці React-компонентів часто виникає проблема змішування логіки отримання даних та їх відображення в одному компоненті.
Це призводить до складних, важко тестованих компонентів, які важко підтримувати та розширювати.
Особливо це помітно на сторінках профілю користувача, де потрібно отримувати дані з API, керувати станом та відображати різні елементи інтерфейсу.

## Причина використання Container/Presentational Pattern 🤔

Container/Presentational Pattern розділяє компоненти на дві категорії:

- **Container компоненти** - відповідають за логіку, отримання даних та управління станом
- **Presentational компоненти** - відповідають лише за відображення UI на основі отриманих props

## Переваги використання ✅

- **Розділення відповідальності**: чіткий розподіл між логікою та відображенням
- **Покращена тестованість**: презентаційні компоненти легше тестувати, оскільки вони не мають побічних ефектів
- **Повторне використання**: презентаційні компоненти можна використовувати в різних контекстах
- **Легше підтримувати**: зміни в логіці не впливають на відображення і навпаки

## Недоліки використання ⚠️

- **Більше файлів**: збільшення кількості файлів у проєкті
- **Додаткова складність**: необхідність передавати дані через props
- **Надмірне розділення**: іноді може призвести до надмірного розділення простих компонентів

## Опис реалізації 🔧

У нашому проєкті було застосовано Container/Presentational Pattern для сторінки профілю користувача. Розділено на такі компоненти:

1. **Container компоненти**:

- `ProfilePageContainer` - основний контейнер, який отримує дані користувача
- `FavoriteBooksContainer` - контейнер для отримання улюблених книг
- `SecurityFormContainer` - контейнер для обробки форми зміни пароля
- `ProfileCardContainer` - контейнер для обробки логіки виходу з профілю

2. **Presentational компоненти**:

- `ProfilePageView` - відображає загальний макет сторінки
- `FavoriteBooksView` - відображає список улюблених книг
- `SecurityFormView` - відображає форму зміни пароля
- `ProfileCardView` - відображає картку профілю користувача

## Кодова реалізація 💻

```tsx
'use client'

import { useState, useEffect } from 'react'

import FavoriteBooksView from '../presentational/favorite-books-view'

import profileAPI from '@/api/profile-api'
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import type { Book } from '@/types/book'

const FavoriteBooksContainer = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getFavoriteBooks = async () => {
      try {
        setIsLoading(true)
        const response = await profileAPI.getLikedBooks()
        setFavoriteBooks(response.data as Book[])
      } catch (error) {
        console.error('Failed to fetch favorite books:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getFavoriteBooks()
  }, [])

  return (
    <AccordionItem value='favorite-books' className='px-2'>
      <AccordionTrigger>Вподобані книжки</AccordionTrigger>
      <AccordionContent>
        <FavoriteBooksView
          favoriteBooks={favoriteBooks}
          isLoading={isLoading}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default FavoriteBooksContainer
```

```tsx
import { HeartCrack } from 'lucide-react'

import BookCard from '@/app/catalog/components/book-card'
import type { Book } from '@/types/book'

interface FavoriteBooksViewProps {
  favoriteBooks: Book[]
  isLoading: boolean
}

const FavoriteBooksView = ({
  favoriteBooks,
  isLoading,
}: FavoriteBooksViewProps) => {
  if (isLoading) {
    return (
      <div className='flex justify-center py-10'>
        <div
          className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'
          role='loading'
        ></div>
      </div>
    )
  }

  if (!favoriteBooks || favoriteBooks.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-10 text-center text-gray-500'>
        <HeartCrack className='w-12 h-12 mb-4' role='no-books' />
        <p className='text-lg font-medium'>У вас поки немає вподобаних книг.</p>
        <p className='text-sm'>
          Перейдіть до каталогу, щоб додати книги у список вподобань.
        </p>
      </div>
    )
  }

  return (
    <div className='max-h-[calc(100vh-320px)] overflow-y-auto pr-4'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {favoriteBooks.map((book, index) => (
          <div className='h-4/5' key={index}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoriteBooksView
```
