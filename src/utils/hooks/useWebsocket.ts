import { useEffect, useState } from "react";
import type { Socket } from 'socket.io-client';
import {
  createWsClient,
  sendWsMessage
} from '@/utils/ws/wsClient'

type MessageHandler = {
  type: string
  handler: (msg: string) => void
}

export function useWebsocket(msgHandlers: MessageHandler[]) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const ws = createWsClient()

    msgHandlers.forEach((handler) => {
      ws?.on(handler.type, handler.handler)
    })

    setSocket(ws)

    // Clean up the socket connection on unmount
    return () => {
      ws.disconnect();
    };
  }, []);

  const sendMessage = (msg: string) => {
    sendWsMessage(socket, msg)
  };

  return sendMessage
}
