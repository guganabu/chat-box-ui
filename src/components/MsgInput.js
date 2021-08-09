import React from "react"
import "./MsgInput.scss"
import { socketClient } from "../services/Socket"
import { messageService } from "../services/Message"

class MsgInput extends React.Component {
  // static contextType = SocketContext;
  constructor(props) {
    super(props)
    this.state = { inputMsg: "" }

    // this.socket = this.context.socket;
    // this.id = this.context.id;
    // console.log("context", this.context);
    // console.log("id", this.props);
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

  emit() {
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
        user_name: this.props.userPref.name,
      },
    }
  }

  render() {
    return (
      <textarea
        type="text"
        name="inputMsg"
        className="msg-input"
        value={this.state.inputMsg}
        onKeyPress={this.onKeyPress}
        onChange={this.onInputchange}
      />
    )
  }
}

export default MsgInput
