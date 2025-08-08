import { io, Socket } from 'socket.io-client'

const URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:4000'

export const socket: Socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
})