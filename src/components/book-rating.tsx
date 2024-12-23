import { Star } from 'lucide-react'
import { FC } from 'react'

interface BookRatingProps {
  rating: number
}

const BookRating: FC<BookRatingProps> = ({ rating }) => {
  return (
    <div className='flex items-center mt-2'>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          data-testid={i < Math.floor(rating) ? 'filled-star' : 'empty-star'}
          className={`h-4 w-4 ${
            i < Math.floor(rating || 0) ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className='ml-1 text-sm text-gray-500' data-testid='rating'>
        {rating?.toFixed(1)}
      </span>
    </div>
  )
}

export default BookRating
