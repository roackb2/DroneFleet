import { createServer } from "http";
import { Server } from "socket.io";
import type { ServerOptions } from "socket.io";

const PORT = 3001
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
} as Partial<ServerOptions>);

io.on("connection", (socket) => {
  console.log(`new connection ${socket.id}`)

  socket.on('message', msg => {
    console.log(`received message ${msg}`)

    const result = `received message ${msg}`
    socket.emit('ack', result)
  })
});

console.log(`Websocket server listening on ${PORT}`)
httpServer.listen(PORT);
