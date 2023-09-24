import { createServer } from "http";
import { Server } from "socket.io";
import type { ServerOptions } from "socket.io";

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

console.log(`Websocket server listening on ${PORT}`)
httpServer.listen(PORT);
