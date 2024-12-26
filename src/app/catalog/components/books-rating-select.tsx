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

const stars = ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']

const BooksRatingSelect = () => {
  const [minRating, setMinRating] = useQueryState('minRating', {
    shallow: false,
  })

  const handleRatingChange = (rating: string) => {
    if (rating === '0') {
      setMinRating(null)
      return
    }
    setMinRating(rating)
  }

  return (
    <div className='space-y-1'>
      <Label htmlFor='rating'>Мінімальний рейтинг</Label>
      <Select
        onValueChange={handleRatingChange}
        defaultValue={minRating || undefined}
      >
        <SelectTrigger>
          <SelectValue
            data-testid='rating-selector'
            placeholder='Виберіть рейтинг'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='0' data-testid='select-rating'>
            Будь-який
          </SelectItem>
          {stars.map((star) => (
            <SelectItem key={star} value={star} data-testid='select-rating'>
              {star}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default BooksRatingSelect
