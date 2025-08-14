import { Flex, Input, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useGroup } from '../context/GroupContext'
import usePusher from '../hooks/usePusher'
import type { Message } from '../models/Message'
import {
  fetchMessages as fetchMessagesAPI,
  postMessage as postMessageAPI,
} from '../services/MessageService'
import MessageCard from './MessageCard'

const inputStyle: React.CSSProperties = {
  borderRadius: 8,
  backgroundColor: '#1D1D1D',
  color: 'white',
  padding: 8,
  paddingInline: 16,
}

const sectionMessageStyle: React.CSSProperties = {
  flex: 1,
  flexDirection: 'column-reverse',
  overflowY: 'scroll',
  padding: 16,
}

export default function ContentMessage() {
  const { user, token } = useAuth()
  const { currentGroup } = useGroup()

  const [messages, setMessages] = useState<Array<Message>>([])
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!token || !currentGroup) return

    setLoading(true)
    fetchMessagesAPI(token, currentGroup.id)
      .then((data) => {
        setMessages(data)
      })
      .catch((error) => {
        console.error('Error fetching messages:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentGroup, token])

  usePusher({
    channelName: currentGroup ? `group.${currentGroup.id}` : null,
    eventName: 'message.sent',
    callback: (data) => {
      if (data && data.message) {
        setMessages((prevMessages) => [...prevMessages, data.message])
      }
    },
  })

  const handleSendMessage = async () => {
    if (!token || !currentGroup || !currentMessage.trim()) return

    postMessageAPI(token, currentGroup.id, currentMessage)
      .then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now().toString(),
            content: currentMessage,
            sender_id: user.id,
            group_id: currentGroup.id,
            created_at: new Date().toISOString(),
            sender: user,
          },
        ])
        setCurrentMessage('')
      })
      .catch((error) => {
        console.error('Error sending message:', error)
      })
  }

  return (
    <>
      <Flex style={sectionMessageStyle} gap={8}>
        {loading ? (
          <Flex justify="center" align="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <Flex vertical gap={8}>
            {messages.map((message, index) => (
              <MessageCard
                key={index}
                content={message.content}
                messageOut={message.sender_id === user.id}
                createdAt={message.created_at}
              />
            ))}
          </Flex>
        )}
      </Flex>

      <Flex style={{ padding: 16 }}>
        <Input
          placeholder="Enter your message"
          variant="filled"
          style={inputStyle}
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onPressEnter={handleSendMessage}
        />
      </Flex>
    </>
  )
}
