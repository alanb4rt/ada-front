import type { User } from './User'

interface Group {
  id: number
  name: string
  users: User[]
}

export type { Group }
