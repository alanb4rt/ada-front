import { UserOutlined } from '@ant-design/icons'
import { Avatar, Space, Typography } from 'antd'
import { useAuth } from '../context/AuthContext'
import { useGroup } from '../context/GroupContext'
import type { User } from '../models/User'

const { Text } = Typography

interface Props {
  users: User | User[]
  active?: boolean
}

export default function UserCard({ users, active }: Props) {
  const { currentGroup } = useGroup()
  const { user } = useAuth()
  const baseStyle = {
    width: '100%',
    paddingInline: 16,
    borderRadius: 8,
    cursor: 'pointer',
  }
  console.log('UserCard:', user)

  const activeStyle = active ? { backgroundColor: '#050505ff' } : {}

  if (Array.isArray(user)) {
    return (
      <Space style={{ ...baseStyle, ...activeStyle }} size={16}>
        {user.map((u) => (
          <Avatar key={u.id} size={50} icon={<UserOutlined />} />
        ))}
        <Text>{user.map((u) => u.username).join(', ')}</Text>
      </Space>
    )
  }

  return (
    <Space style={{ ...baseStyle, ...activeStyle }} size={16}>
      <Avatar size={50} icon={<UserOutlined />} />
      <Text>{user.username}</Text>
    </Space>
  )
}
