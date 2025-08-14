import { createContext, useContext, useState, type ReactNode } from 'react'

interface GroupContextType {
  currentGroup: number | null
  setCurrentGroup: (id: number) => void
}

const GroupContext = createContext<GroupContextType | undefined>(undefined)

const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [currentGroup, setCurrentGroup] = useState<number | null>(null)

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
