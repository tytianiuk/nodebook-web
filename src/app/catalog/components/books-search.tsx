'use client'
import { useQueryState } from 'nuqs'
import { useState } from 'react'

import { Input } from '@/components/ui/input'

const BooksSearch = () => {
  const [urlName, setUrlName] = useQueryState('name', { shallow: false })
  const [urlAuthor, setUrlAuthor] = useQueryState('author', { shallow: false })

  const [nameSearch, setNameSearch] = useState<string | null>(urlName || '')
  const [authorSearch, setAuthorSearch] = useState<string | null>(
    urlAuthor || '',
  )

  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.target.value)

    if (e.target.value === '') {
      setUrlName(null)
      return
    }
    setUrlName(e.target.value)
  }

  const handleAuthorSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorSearch(e.target.value)

    if (e.target.value === '') {
      setUrlAuthor(null)
      return
    }
    setUrlAuthor(e.target.value)
  }

  return (
    <div className='space-y-4'>
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'
        >
          Пошук за назвою книги
        </label>
        <Input
          id='name'
          type='text'
          placeholder='Назва книги...'
          value={nameSearch || ''}
          onChange={handleNameSearch}
        />
      </div>

      <div>
        <label
          htmlFor='author'
          className='block text-sm font-medium text-gray-700'
        >
          Пошук за автором
        </label>
        <Input
          id='author'
          type='text'
          placeholder={"Ім'я автора книги..."}
          value={authorSearch || ''}
          onChange={handleAuthorSearch}
        />
      </div>
    </div>
  )
}

export default BooksSearch
