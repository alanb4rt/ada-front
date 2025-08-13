import {
  ArrowLeftOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Drawer, Flex, Space, Typography } from 'antd'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useGroup } from '../context/GroupContext'
import UserCard from './UserCard'

const { Text, Title } = Typography

const users = [
  { id: 1, idGroupe: 1, name: 'Test', href: 'test' },
  { id: 2, idGroupe: 2, name: 'Test', href: 'test' },
  { id: 3, idGroupe: 3, name: 'Test', href: 'test' },
  { id: 4, idGroupe: 4, name: 'Test', href: 'test' },
  { id: 5, idGroupe: 5, name: 'Test', href: 'test' },
]

const drawerBodyStyle: React.CSSProperties = {
  paddingInline: 0,
}

export default function SideBar() {
  const { logout } = useAuth()
  const { currentGroup, setCurrentGroup } = useGroup()

  const [open, setOpen] = useState<boolean>(false)
  const [openGroup, setOpenGroup] = useState<boolean>(false)

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
          onClick={() => setOpen(true)}
        />
      </Flex>
      <Space
        direction="vertical"
        size={16}
        style={{ width: '100%', flex: 1, overflowY: 'scroll' }}
      >
        {users.map((user) => (
          <div onClick={() => setCurrentGroup(user.idGroupe)}>
            <UserCard
              key={user.id}
              user={user}
              active={user.idGroupe === currentGroup}
            />
          </div>
        ))}
      </Space>
      <Drawer
        title="New conversation"
        closeIcon={<ArrowLeftOutlined />}
        placement="left"
        width={255}
        onClose={() => setOpen(false)}
        open={open}
        mask={false}
        maskClosable={false}
        styles={{ body: drawerBodyStyle }}
      >
        <Space
          direction="vertical"
          size={16}
          style={{ width: '100%', flex: 1, overflowY: 'scroll' }}
        >
          <Space
            style={{ padding: 16, cursor: 'pointer' }}
            onClick={() => setOpenGroup(true)}
          >
            <Avatar
              size={50}
              icon={<UserAddOutlined />}
              style={{ backgroundColor: '#b74040' }}
            />
            <Text>New group</Text>
          </Space>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Space>
      </Drawer>
      <Drawer
        title="Add members to group"
        closeIcon={<ArrowLeftOutlined />}
        placement="left"
        width={255}
        onClose={() => setOpenGroup(false)}
        open={openGroup}
        mask={false}
        maskClosable={false}
        styles={{ body: drawerBodyStyle }}
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
