import { ArrowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Drawer, Flex, Space, Typography } from 'antd'
import { useState } from 'react'
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

  const [open, setOpen] = useState(false)

  return (
    <Flex vertical style={{ height: '100vh' }}>
      <SideBarContent value={{ setOpen }} />
      <Drawer
        title="New conversation"
        closeIcon={<ArrowLeftOutlined />}
        placement="left"
        width={255}
        onClose={() => setOpen(false)}
        open={open}
        mask={false}
        maskClosable={false}
      >
        <Space
          direction="vertical"
          size={16}
          style={{ width: '100%', flex: 1, overflowY: 'scroll' }}
        >
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Space>
      </Drawer>
      <Button style={{ height: 64 }} onClick={logout}>
        Logout
      </Button>
    </Flex>
  )
}

function SideBarContent({ value }: any) {
  const { setOpen } = value

  return (
    <>
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
          onClick={() => setOpen(true)}
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
    </>
  )
}
