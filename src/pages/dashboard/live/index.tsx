import { useEffect, useState } from "react";
import { LiveMap } from "./live-map"
import { getDashboardLayout } from "@/pages/dashboard/layout"
import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

function Live() {
  // State to store the messages
  const [messages, setMessages] = useState([]);
  // State to store the current message
  const [currentMessage, setCurrentMessage] = useState('');

  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    // Create a socket connection
    const ws = io('http://localhost:3001');

    // Listen for incoming messages
    ws.on('message', (message) => {
       console.log(message)
    });

    ws.on('ack', (message) => {
      console.log(`received ack with ${message}`)
    })

    setSocket(ws)

    // Clean up the socket connection on unmount
    return () => {
      ws.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // Send the message to the server
    socket?.emit('message', currentMessage);
    // Clear the currentMessage state
    setCurrentMessage('');
};

  return (
    <div>
      {/* Display the messages */}
      {messages.map((message, index) => (
          <p key={index}>{message}</p>
      ))}

      {/* Input field for sending new messages */}
      <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
      />

      {/* Button to submit the new message */}
      <button onClick={sendMessage}>Send</button>
      <LiveMap />
    </div>
  )
}

Live.getLayout = getDashboardLayout

export default Live
