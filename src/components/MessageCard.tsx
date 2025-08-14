import { Card, Flex, Typography } from 'antd'
import dayjs from 'dayjs'

const { Text } = Typography

interface Props {
  content: string
  createdAt: string
  messageOut?: boolean
}

export default function MessageCard({ content, messageOut, createdAt }: Props) {
  const backgroundColor = messageOut ? '#b74040' : undefined
  const justify = messageOut ? 'flex-end' : undefined

  return (
    <Flex justify={justify} style={{ width: '100%' }}>
      <Card style={{ width: 'fit-content', backgroundColor }}>
        <Text type="secondary" style={{ fontSize: 10 }}>
          {dayjs(createdAt).format('hh:mm')}{' '}
        </Text>
        <Text>{content}</Text>
      </Card>
    </Flex>
  )
}
