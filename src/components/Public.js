import "./Public.scss"
import { socketClient } from "../services/Socket"
import React from "react"
import MsgInput from "./MsgInput"
import MsgList from "./MsgList"
import UserPreference from "./UserPreference"
import { messageService } from "../services/Message"

class Public extends React.Component {
  constructor() {
    super()
    this.state = { messages: [], isShowUserPreference: true, userPref: {} }
    this.msgSubscription = null
  }

  componentDidMount() {
    // Local msgs captured via context
    this.msgSubscription = messageService.getMessage().subscribe((message) => {
      this.updateMsgs(message)
    })

    // Public msgs captured via socket
    socketClient.on("private", (msg) => {
      console.log("msg in pub", msg)
      this.updateMsgs(msg)
    })
  }

  componentWillUnmount() {
    this.msgSubscription.unsubscibe()
  }

  updateMsgs(message) {
    console.log("state", ...this.state.messages)
    this.setState({ messages: [...this.state.messages, message] })
  }

  saveUserPreference = (pref) => {
    this.setState({ isShowUserPreference: false, userPref: pref })
  }

  render() {
    if (this.state.isShowUserPreference) {
      return <UserPreference handleSave={this.saveUserPreference} />
    } else {
      return (
        <div className="chat-window">
          <MsgList messages={this.state.messages} />
          <MsgInput room="private" userPref={this.state.userPref} />
        </div>
      )
    }
  }
}

export default Public
