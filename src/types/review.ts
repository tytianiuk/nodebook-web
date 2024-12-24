import { User } from '@/types/user'

export type Review = {
  _id: string
  userId: User
  rating: number
  comment: string
}
