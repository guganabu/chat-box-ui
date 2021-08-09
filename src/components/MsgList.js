import React from "react"
import "./MsgList.scss"
import { format } from "date-fns"

class MsgList extends React.Component {
  constructor(props) {
    super(props)
    console.log("props", props)
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    console.log("comp update")
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    console.log("this.messagesEnd", this.messagesEnd)
    this.messagesEnd.scrollIntoView(false)
  }

  render() {
    return (
      <div className="msg-list">
        {this.props.messages.map((msg, seq) => {
          return (
            <div className={`msg-item-container ${msg.actor}`} key={seq}>
              <div className="user-name">
                {msg.actor === "self" ? "You" : msg.data.user_name}
              </div>
              <div className="msg-list-item">
                <span className="msg-list-item-value">
                  <span className="msg-list-item-value__text">
                    {msg.data.text}
                  </span>
                  <span className="msg-list-item-value__time">
                    {console.log("msg.data.date_time", msg.data.date_time)}
                    {format(new Date(msg.data.date_time), "p")}
                  </span>
                </span>
              </div>
            </div>
          )
        })}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el
          }}
        ></div>
      </div>
    )
  }
}

export default MsgList
