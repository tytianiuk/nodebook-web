'use client'
import { useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'

import CategoriesAPI from '@/api/categories-api'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Category } from '@/types/categories'

const BooksCategorySelector = () => {
  const [category, setCategory] = useQueryState('category', { shallow: false })

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await CategoriesAPI.getAllCategories()
      return response.data as Category[]
    },
    staleTime: 1000 * 60 * 60,
  })

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      setCategory(null)
      return
    }
    setCategory(categoryId)
  }

  return (
    <div className='space-y-1'>
      <Label htmlFor='category'>Жанр</Label>
      <Select
        onValueChange={handleCategoryChange}
        defaultValue={category || undefined}
      >
        <SelectTrigger aria-label='Виберіть жанр'>
          <SelectValue
            data-testid='category-selector'
            placeholder='Виберіть жанр'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all' data-testid='select-category'>
            Всі жанри
          </SelectItem>
          {categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              data-testid='select-category'
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default BooksCategorySelector
