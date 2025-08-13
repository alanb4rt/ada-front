import { Avatar, Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { User } from '../models/User'

const { Text } = Typography

interface Props {
  user: User
}

export default function UserCard({ user }: Props) {
  return (
    <Space
      style={{
        width: '100%',
        paddingInline: 16,
        borderRadius: 8,
      }}
      size={16}
    >
      <Avatar size={50} icon={<UserOutlined />} />
      <Text>{user.name}</Text>
    </Space>
  )
}
