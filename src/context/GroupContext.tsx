import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import type { Group } from '../models/Group'

interface GroupContextType {
  currentGroup: Group | null
  setCurrentGroup: Dispatch<SetStateAction<Group | null>>
}

const GroupContext = createContext<GroupContextType | undefined>(undefined)

const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null)

  const valueContext = { currentGroup, setCurrentGroup }

  return (
    <GroupContext.Provider value={valueContext}>
      {children}
    </GroupContext.Provider>
  )
}

const useGroup = (): GroupContextType => {
  const context = useContext(GroupContext)
  if (!context) {
    throw new Error('useGroup must be used within an groupProvider')
  }
  return context
}

export { GroupProvider, useGroup }
