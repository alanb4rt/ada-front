import type { User } from './User'

interface Message {
  id: string
  content: string
  sender_id: string
  group_id: string
  created_at: string
  sender: User
}
export type { Message }
