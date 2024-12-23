'use client'
import { useQueryState } from 'nuqs'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Categories } from '@/constants/categories'

const BooksCategorySelector = () => {
  const [category, setCategory] = useQueryState('category', { shallow: false })

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      setCategory(null)
      return
    }
    setCategory(category)
  }

  return (
    <div className='space-y-1'>
      <Label htmlFor='gategory'>Жанр</Label>
      <Select
        onValueChange={handleCategoryChange}
        defaultValue={category || undefined}
      >
        <SelectTrigger>
          <SelectValue
            data-testid='category-selector'
            placeholder='Виберіть жанр'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Всі жанри</SelectItem>
          {Object.values(Categories).map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default BooksCategorySelector
