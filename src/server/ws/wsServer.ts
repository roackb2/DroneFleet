import net from 'net'
import { createServer } from "http";
import { Server } from "socket.io";
import type { ServerOptions } from "socket.io";

import { mavlink20, MAVLink20Processor } from 'mavlinkjs/mavlink_all_v2';

import registerClientHandler from "./handlers/client";

const PORT = 3001
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
} as Partial<ServerOptions>);

io.on("connection", (socket) => {
  console.log(`New connection ${socket.id}`)

  registerClientHandler(io, socket)
});

// setup mavlink parser & mavproxy listener
const mavlinkParser = new MAVLink20Processor(null, 255, 255)

mavlinkParser.on('message', (msg) => {
  console.log('received mavlink message', msg)
  io.emit('drone', msg)
})

mavlinkParser.on('HEARTBEAT', msg => {
  console.log('received HEARTBEAT message')
})

const mavproxyClient = new net.Socket()
mavproxyClient.on('data', function(data) {
  console.info('received MAVPRoxy data, length ', data.length)
  mavlinkParser.parseBuffer(data)
})

mavproxyClient.on('close', function() {
  console.info('Connection closed')
})

mavproxyClient.connect(5762, 'localhost', async function() {
  console.info('Connected to MAVPRoxy')
})

// start the websocket server
console.log(`Websocket server listening on ${PORT}`)
httpServer.listen(PORT);
