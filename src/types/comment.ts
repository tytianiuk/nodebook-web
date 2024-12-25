import { User } from '@/types/user'

export type Comment = {
  _id: string
  userId: User
  comment: string
}
