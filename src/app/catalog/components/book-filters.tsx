import BooksGenreSelector from '@/app/catalog/components/book-genre-selector'
import BooksRatingSelect from '@/app/catalog/components/books-rating-select'
import BooksSearch from '@/app/catalog/components/books-search'

const BooksFilters = () => {
  return (
    <div className='md:col-span-1'>
      <div
        className='bg-white p-4 rounded-lg shadow'
        data-testid='filters-container'
      >
        <h2 className='text-xl font-semibold mb-4'>Фільтри</h2>
        <div className='space-y-4'>
          <BooksSearch />
          <BooksGenreSelector />
          <BooksRatingSelect />
        </div>
      </div>
    </div>
  )
}

export default BooksFilters
