import { useState } from "react";
import { LiveMap } from "./live-map"
import { getDashboardLayout } from "@/pages/dashboard/layout"
import { useWebsocket } from "@/utils/hooks/useWebsocket";
import { mavlink20, MAVLink20Processor } from 'mavlinkjs/mavlink_all_v2';

const MAX_DRONE_MESSAGES = 20

function Live() {
  // State to store the messages
  const [messages, setMessages] = useState([]);
  // State to store the current message
  const [currentMessage, setCurrentMessage] = useState('');

  const [droneMessages, setDroneMessages] = useState<Object[]>([])

  const [isArmed, setIsArmed] = useState<boolean>(false)

  const [position, setPosition] = useState({
    lat: 0, lng: 0, alt: 0, relative_alt: 0
  })

  const [hud, setHud] = useState({
    airspeed: 0, groundspeed: 0, heading: 0, throttle: 0, climb: 0
  })

  const [attitude, setAttitude] = useState({
    roll: 0, pitch: 0, yaw: 0, rollspeed: 0, pitchspeed: 0, yawspeed: 0
  })

  const ackHandler = {
    type: 'ack',
    handler: (msg: string) => {
      console.log(msg)
    }
  }

  const handleDrone = (msg: Object) => {
    const getArmStatus = (baseMode) => {
      const mask = mavlink20.MAV_MODE_FLAG_DECODE_POSITION_SAFETY;
      return (mask & baseMode);
    }
    switch (msg.name) {
      case 'HEARTBEAT':
        setIsArmed(getArmStatus(msg.base_mode))
        break;
      case 'GLOBAL_POSITION_INT':
        console.log(msg)
        const positionShift = Math.pow(10, 7);
        const { lat, lon, alt, relative_alt } = msg;
        setPosition({
          lat: lat / positionShift,
          lng: lon / positionShift,
          alt,
          relative_alt
        })
        break;
      case 'ATTITUDE':
          const { roll, pitch, yaw, rollspeed, pitchspeed, yawspeed } = msg;
          setAttitude({ roll, pitch, yaw, rollspeed, pitchspeed, yawspeed })
      case 'VFR_HUD':
          const { airspeed, groundspeed, heading, throttle, climb } = msg;
          setHud({ airspeed, groundspeed, heading, throttle, climb })
          break;
    }
  }

  const droneMessageHandler = {
    type: 'drone',
    handler: (msg: Object) => {

      handleDrone(msg)
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
      <div className="flex-grow relative">
        <LiveMap
          droneLocation={{
            lat: position.lat,
            lng: position.lng
          }}
        />
        <div className="absolute top-1 left-1 p-2 text-white">
          <p>{ JSON.stringify(position) }</p>
          <p>{ JSON.stringify(hud) }</p>
          <p>{ JSON.stringify(attitude) }</p>
          <p>armed: { isArmed ? 'true' : 'false' }</p>
          <p>height: { position.relative_alt } m</p>
        </div>
      </div>
    </div>
  )
}

Live.getLayout = getDashboardLayout

export default Live
