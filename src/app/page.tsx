import { Metadata } from 'next'
import { FC, Suspense } from 'react'

import BooksFilters from '@/app/catalog/components/book-filters'
import BooksList from '@/app/catalog/components/books-list'
import { Filters } from '@/types/book'

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
          <BooksList filters={searchParams} />
        </div>
      </div>
    </Suspense>
  )
}

export default Catalog
