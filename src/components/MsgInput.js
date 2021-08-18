import React from "react"
import "./MsgInput.scss"
import { socketClient } from "../services/Socket"
import { messageService } from "../services/Message"
import UserContext from "../context/UserContext"
import Icon from "@material-ui/core/Icon"

class MsgInput extends React.Component {
  static contextType = UserContext
  constructor(props) {
    super(props)
    this.state = { inputMsg: "" }
  }

  onKeyPress = (e) => {
    if (e.charCode === 13) {
      this.emit()
    }
  }

  onInputchange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  emit = () => {
    socketClient.emit(this.props.room, this._msgObject())
    messageService.pushMessage(this._msgObject())
    this.setState({ inputMsg: "" })
  }

  _msgObject() {
    return {
      actor: "self",
      data: {
        text: this.state.inputMsg,
        date_time: new Date(),
        user_name: this.context.name,
      },
    }
  }

  render() {
    return (
      <div className="MsgInput">
        <Icon className="MsgInput-icon" onClick={this.emit}>
          send
        </Icon>
        <input
          type="text"
          name="inputMsg"
          className="MsgInput-box"
          value={this.state.inputMsg}
          onKeyPress={this.onKeyPress}
          onChange={this.onInputchange}
        />
      </div>
    )
  }
}

export default MsgInput
