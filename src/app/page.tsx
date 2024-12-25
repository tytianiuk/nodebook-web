import { Loader2 } from 'lucide-react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'

import BooksFilters from '@/app/catalog/components/book-filters'
import { Filters } from '@/types/book'

const DynamicBooksList = dynamic(
  () => import('@/app/catalog/components/books-list'),
  {
    loading: () => (
      <div className='col-span-3 flex flex-col items-center justify-center h-full text-center  '>
        <Loader2 className='col-span-3 self-center w-12 h-12 animate-spin text-gray-300' />
        <span className='text-2xl text-gray-300 font-bold mb-2'>
          Завантаження...
        </span>
      </div>
    ),
  },
)

interface CatalogProps {
  searchParams: Filters
}

export const metadata: Metadata = {
  title: 'Каталог | NoteBook',
}

const Catalog: FC<CatalogProps> = async ({ searchParams }) => {
  return (
    <Suspense>
      <div>
        <h1 className='text-3xl font-bold my-6'>Каталог книг</h1>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-165px)]'>
          <BooksFilters />
          <div className='md:col-span-3 md:overflow-y-auto'>
            <DynamicBooksList filters={searchParams} />
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Catalog
