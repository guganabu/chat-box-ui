import { io } from "socket.io-client"

class SocketClient {
  constructor() {
    this.io = io(`http://localhost:3000`)
  }

  init() {
    this.io.on("connect", () => {
      console.log("socket connected!")
    })
  }
}

export const socketClient = new SocketClient().io
