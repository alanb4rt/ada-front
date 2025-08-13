import { Button, Flex, Space, Typography } from 'antd'
import { useAuth } from '../context/AuthContext'
import UserCard from './UserCard'

const { Title } = Typography

const users = [
  { id: 1, name: 'Test', href: 'test' },
  { id: 2, name: 'Test', href: 'test' },
  { id: 3, name: 'Test', href: 'test' },
  { id: 4, name: 'Test', href: 'test' },
  { id: 5, name: 'Test', href: 'test' },
]

export default function SideBar() {
  const { logout } = useAuth()

  return (
    <Flex vertical style={{ height: '100vh' }}>
      <Title level={4}>ADA</Title>
      <Space
        direction="vertical"
        size={16}
        style={{ width: '100%', flex: 1, overflowY: 'scroll' }}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Space>
      <Button style={{ height: 64 }} onClick={logout}>
        Logout
      </Button>
    </Flex>
  )
}
