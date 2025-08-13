import { PlusCircleOutlined } from '@ant-design/icons'
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
      <Flex
        justify="center"
        align="center"
        style={{ position: 'relative', padding: 16 }}
      >
        <Title level={4} style={{ margin: 0 }}>
          ADA
        </Title>
        <PlusCircleOutlined
          style={{
            color: 'white',
            fontSize: '16px',
            position: 'absolute',
            right: 16,
          }}
        />
      </Flex>
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
