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
