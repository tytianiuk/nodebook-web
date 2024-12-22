import { Comment } from '@/types/comment'
import { Review } from '@/types/review'

export type Book = {
  id: string
  name: string
  description?: string
  author: string
  category: string
  pageQuantity: number
  averageRating: number
  comments: Comment[]
  reviews: Review[]
}

export interface Filters {
  search?: string
  category?: string
  minRating?: number
}
