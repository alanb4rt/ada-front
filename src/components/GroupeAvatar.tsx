import { UserOutlined } from '@ant-design/icons'
import { Avatar, Space, Typography } from 'antd'
import { useAuth } from '../context/AuthContext'
import type { User } from '../models/User'

const { Text } = Typography

interface Props {
  users: User[]
  groupName: string
  active?: boolean
}

export default function GroupeAvatar({ users, active, groupName }: Props) {
  const { user } = useAuth()

  const baseStyle = {
    width: '100%',
    paddingInline: 16,
    borderRadius: 8,
    height: 50,
    cursor: 'pointer',
  }

  if (!user) {
    return <></>
  }

  const correspondantUsers = users.filter((u) => u.id !== user.id)
  const activeStyle = active ? { backgroundColor: '#924b4bff' } : {}

  if (correspondantUsers.length < 3) {
    return (
      <Space style={{ ...baseStyle, ...activeStyle }} size={16}>
        <Avatar.Group
          max={{
            count: 3,
          }}
        >
          {correspondantUsers.map((u) => (
            <Avatar key={u.id} size={40} icon={<UserOutlined />} />
          ))}
        </Avatar.Group>
        <Text>{groupName}</Text>
      </Space>
    )
  } else if (correspondantUsers.length >= 3) {
    return (
      <Space style={{ ...baseStyle, ...activeStyle }} size={16}>
        <Text>{groupName}</Text>
      </Space>
    )
  }

  return (
    <Space style={{ ...baseStyle, ...activeStyle }} size={16}>
      <Avatar size={50} icon={<UserOutlined />} />
      <Text>{correspondantUsers.map((u) => u.username)}</Text>
    </Space>
  )
}
