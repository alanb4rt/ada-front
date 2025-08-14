import { UserOutlined } from '@ant-design/icons'
import { Avatar, Space, Typography } from 'antd'
import type { User } from '../models/User'

const { Text } = Typography

interface Props {
  user: User
  active?: boolean
}

export default function UserCard({ user, active }: Props) {
  const baseStyle = {
    width: '100%',
    paddingInline: 16,
    borderRadius: 8,
    cursor: 'pointer',
  }

  const activeStyle = active ? { backgroundColor: '#050505ff' } : {}

  return (
    <Space style={{ ...baseStyle, ...activeStyle }} size={16}>
      <Avatar size={50} icon={<UserOutlined />} />
      <Text>{user.name}</Text>
    </Space>
  )
}
