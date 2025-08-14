import { Card, Flex, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import type { Message } from '../models/Message'

const { Text } = Typography

interface Props {
  message: Message
  messageOut?: boolean
}

export default function MessageCard({ message, messageOut }: Props) {
  const backgroundColor = messageOut ? '#b74040' : undefined
  const justify = messageOut ? 'flex-end' : undefined

  return (
    <Flex justify={justify} style={{ width: '100%' }}>
      <Card style={{ width: 'fit-content', backgroundColor }}>
        <Space direction="vertical" size={0}>
          <Text type="secondary" style={{ fontSize: 10 }}>
            {message.sender.username}
          </Text>
          <Space>
            <Text type="secondary" style={{ fontSize: 10 }}>
              {dayjs(message.created_at).format('hh:mm')}{' '}
            </Text>
            <Text>{message.content}</Text>
          </Space>
        </Space>
      </Card>
    </Flex>
  )
}
