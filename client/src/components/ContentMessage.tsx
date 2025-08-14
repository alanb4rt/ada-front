import { Button, Flex, Input } from 'antd'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import MessageCard from './MessageCard'

const socket = io('http://localhost:3000')

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
  const [room, setRoom] = useState('')
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room)
    }
  }

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: socket.id,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      }

      socket.emit('send_message', messageData)
      setMessageList((list) => [...list, messageData])
      setCurrentMessage('')
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data])
    })

    return () => socket.off('receive_message')
  }, [])

  return (
    <>
      <Flex style={sectionMessageStyle} gap={8}>
        {messageList.map((messageContent, index) => (
          <MessageCard
            key={index}
            content={messageContent.message}
            messageOut={messageContent.author === socket.id}
          />
        ))}
      </Flex>
      <Flex style={{ padding: 16 }}>
        <Input
          placeholder="Enter your room"
          variant="filled"
          style={inputStyle}
          onChange={(e) => setRoom(e.target.value)}
        />
        <Button onClick={joinRoom}>Send</Button>
        <Input
          placeholder="Enter your message"
          variant="filled"
          style={inputStyle}
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </Flex>
    </>
  )
}
