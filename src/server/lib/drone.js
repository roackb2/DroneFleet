/* eslint-disable */
import { mavlink20 as mavlink20, MAVLink20Processor as MAVLink20 } from 'mavlinkjs/mavlink_all_v2'

export function connectDrone() {
  const parser = new MAVLink20(null, 1, 255)

  parser.on('HEARTBEAT', (msg => {
    console.log(msg)
  }))

  const socket = new TCPSocket()

  socket.on('data', data => {
    parser.parseBuffer(Buffer.from(data))
  })

  socket.on('close', () => {
    console.debug('socket connection closed')
  })

  socket.on('error', err => {
    console.debug(`socket connection error: ${err}`);
  })

  socket.connect(5760, '127.0.0.1', function() {
    console.debug('Connected to MAVProxy');
  });
}
