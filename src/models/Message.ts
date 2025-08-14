import type { User } from './User'

interface Message {
  id: number
  content: string
  sender_id: number
  group_id: number
  created_at: string
  sender: User
}
export type { Message }
