import type { User } from './User'

interface Group {
  id: string
  name: string
  users: User[]
}

export type { Group }
