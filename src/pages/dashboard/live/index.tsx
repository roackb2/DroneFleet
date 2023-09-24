import { useState } from "react";
import { LiveMap } from "./live-map"
import { getDashboardLayout } from "@/pages/dashboard/layout"
import { useWebsocket } from "@/utils/hooks/useWebsocket";

const MAX_DRONE_MESSAGES = 20

function Live() {
  // State to store the messages
  const [messages, setMessages] = useState([]);
  // State to store the current message
  const [currentMessage, setCurrentMessage] = useState('');

  const [droneMessages, setDroneMessages] = useState<Object[]>([])

  const ackHandler = {
    type: 'ack',
    handler: (msg: string) => {
      console.log(msg)
    }
  }

  const droneMessageHandler = {
    type: 'drone',
    handler: (msg: Object) => {
      console.log(msg)
      setDroneMessages((droneMessages) => {
        const newMessages = [msg, ...droneMessages]
        if (newMessages.length > MAX_DRONE_MESSAGES) {
          newMessages.pop()
        }
        return newMessages
      })
    }
  }

  const sendMessage = useWebsocket([ackHandler, droneMessageHandler])

  const handleMessage = () => {
    sendMessage(currentMessage)

    setCurrentMessage('');
  };

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-row basis-8">
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
      </div>

      {/* Show drone messages */}
      <div className="flex flex-col basis-40 overflow-y-scroll">
        {droneMessages.map((message, index) => (
          <div key={index}>
            <p>{message.name}</p>
            <p>
              {JSON.stringify(message)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-grow">
        <LiveMap />
      </div>
    </div>
  )
}

Live.getLayout = getDashboardLayout

export default Live
