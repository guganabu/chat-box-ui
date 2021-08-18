import { io } from "socket.io-client"

class SocketClient {
  constructor() {
    this.io = io(`https://g-chat-box.herokuapp.com`)
  }

  init() {
    this.io.on("connect", () => {
      console.log("socket connected!")
    })
  }
}

export const socketClient = new SocketClient().io
