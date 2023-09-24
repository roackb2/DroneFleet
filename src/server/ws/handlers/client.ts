import type { Server, Socket } from 'socket.io'

const registerClientHandler = (io: Server, socket: Socket) => {
  const relayCommand = (cmd: string) => {
    // TBD
  }

  const printMessage = (msg: string) => {
    console.log(`received message ${msg}`)

    const result = `received message ${msg}`
    socket.emit('ack', result)
  }

  socket.on('client:command', relayCommand)
  socket.on('client:message', printMessage)
}

export default registerClientHandler
