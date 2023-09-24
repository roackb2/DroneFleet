import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

export const createWsClient = (): Socket => {
  const socket = io('http://localhost:3001');

  return socket
}

export const sendWsMessage = (socket: Socket | null, message: string): void => {
  socket?.emit('client:message', message);
}
