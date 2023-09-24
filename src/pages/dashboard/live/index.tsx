import { useEffect, useState, useMemo } from "react";
import { LiveMap } from "./live-map"
import { getDashboardLayout } from "@/pages/dashboard/layout"
import { useWebsocket } from "@/utils/hooks/useWebsocket";

function Live() {
  // State to store the messages
  const [messages, setMessages] = useState([]);
  // State to store the current message
  const [currentMessage, setCurrentMessage] = useState('');

  const ackHandler = {
    type: 'ack',
    handler: (msg: string) => {
      console.log(msg)
    }
  }

  const sendMessage = useWebsocket([ackHandler])

  const handleMessage = () => {
    sendMessage(currentMessage)

    setCurrentMessage('');
  };

  return (
    <div className="h-full">
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
      <button onClick={handleMessage}>Send</button>
      <LiveMap />
    </div>
  )
}

Live.getLayout = getDashboardLayout

export default Live
