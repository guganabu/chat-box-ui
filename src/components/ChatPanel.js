import "./ChatPanel.scss"
import { socketClient } from "../services/Socket"
import React from "react"
import MsgInput from "./MsgInput"
import MsgList from "./MsgList"
import { messageService } from "../services/Message"
import UserPreference from "./UserPreference"
import UserContext from "../context/UserContext"

export default class ChatPanel extends React.Component {
  constructor() {
    super()
    this.state = { messages: [], isShowInitialState: true, userPref: {} }
    this.msgSubscription = null
  }

  componentDidMount() {
    // Local msgs captured via context
    this.msgSubscription = messageService.getMessage().subscribe((message) => {
      this.updateMsgs(message)
    })

    // Public msgs captured via socket
    socketClient.on("private", (msg) => {
      this.updateMsgs(msg)
    })
  }

  componentWillUnmount() {
    this.msgSubscription.unsubscibe()
  }

  updateMsgs(message) {
    this.setState({ messages: [...this.state.messages, message] })
  }

  captureUserPref = (userPref) => {
    this.setState({ isShowInitialState: false, userPref: userPref })
  }

  render() {
    if (this.state.isShowInitialState) {
      return <UserPreference sendAction={this.captureUserPref} />
    } else {
      return (
        <div className="ChatWindow">
          <UserContext.Provider value={this.state.userPref}>
            <MsgList messages={this.state.messages} />
            <MsgInput room="private" userPref={{}} />
          </UserContext.Provider>
        </div>
      )
    }
  }
}
