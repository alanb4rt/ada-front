import { Card, Flex, Typography } from 'antd'

const { Text } = Typography

interface Props {
  content: string
  messageOut?: boolean
}

export default function MessageCard({ content, messageOut }: Props) {
  const backgroundColor = messageOut ? '#b74040' : undefined
  const justify = messageOut ? 'flex-end' : undefined

  return (
    <Flex justify={justify} style={{ width: '100%' }}>
      <Card style={{ width: 'fit-content', backgroundColor }}>
        <Text>{content}</Text>
      </Card>
    </Flex>
  )
}
