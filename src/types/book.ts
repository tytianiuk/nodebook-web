import { Category } from '@/types/categories'
import { Comment } from '@/types/comment'
import { Review } from '@/types/review'

export type Book = {
  _id: string
  name: string
  pageQuantity: number
  description?: string
  author: string
  categoryId: Category
  averageRating: number
  comments: Comment[]
  reviews: Review[]
}

export interface Filters {
  name?: string
  author?: string
  category?: string
  minRating?: number
}
