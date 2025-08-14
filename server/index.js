import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()

app.use(cors())

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['*'],
  },
})

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
    socket.emit('room_joined_confirmation', data)
  })

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data)
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
