import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { FC, Suspense } from 'react'

import BooksFilters from '@/app/catalog/components/book-filters'
import { Filters } from '@/types/book'

const DynamicBooksList = dynamic(
  () => import('@/app/catalog/components/books-list'),
  {
    loading: () => <p>Завантаження...</p>,
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
        <h1 className='text-3xl font-bold mb-6'>Каталог книг</h1>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <BooksFilters />
          <DynamicBooksList filters={searchParams} />
        </div>
      </div>
    </Suspense>
  )
}

export default Catalog
