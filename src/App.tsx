import { Layout } from 'antd'
import { useEffect } from 'react'
import ContentMessage from './components/ContentMessage'
import SideBar from './components/SideBar'
import UserCard from './components/UserCard'
import { useAuth } from './context/AuthContext'
import { GroupProvider, useGroup } from './context/GroupContext'
import { fetchGroups } from './services/GroupService'

const { Content, Sider, Header } = Layout

const contentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  borderRightColor: 'rgba(255, 255, 255, .1)',
  borderRightWidth: 1,
  borderRightStyle: 'solid',
}

const layoutStyle: React.CSSProperties = {
  overflow: 'hidden',
  height: '100vh',
}

const user = { id: 1, name: 'Test', href: 'test' }

export function AppContent() {
  const { currentGroup, setCurrentGroup } = useGroup()
  const { token } = useAuth()

  useEffect(() => {
    fetchGroups(token || '').then((groups) => {
      if (groups && groups.length > 0) {
        setCurrentGroup(groups[groups.length - 1].id)
      }
    })
  }, [token, setCurrentGroup])
  return (
    <>
      <Layout style={layoutStyle}>
        <Sider width="16rem" style={siderStyle}>
          <SideBar />
        </Sider>
        {currentGroup && (
          <Layout>
            <Header>
              <UserCard user={user} />
            </Header>
            <Content style={contentStyle}>
              <ContentMessage />
            </Content>
          </Layout>
        )}
      </Layout>
    </>
  )
}

export default function App() {
  return (
    <>
      <GroupProvider>
        <AppContent />
      </GroupProvider>
    </>
  )
}
