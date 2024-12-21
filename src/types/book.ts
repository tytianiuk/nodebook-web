import { Comment } from '@/types/comment'

export type Book = {
  id: number
  name: string
  description?: string
  format?: string
  author: string
  publisher?: string
  genres: string
  releaseDate: string
  rating: number
  image?: string
  comments: Comment[]
}

export interface Filters {
  search?: string
  genre?: string
  minRating?: number
}
