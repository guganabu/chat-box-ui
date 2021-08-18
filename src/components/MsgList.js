import React from "react"
import "./MsgList.scss"
import { format } from "date-fns"

class MsgList extends React.Component {
  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView(false)
  }

  render() {
    return (
      <div className="MsgList">
        {this.props.messages.map((msg, seq) => {
          return (
            <div className={`MsgListItemContainer ${msg.actor}`} key={seq}>
              <div className="UserName">
                {msg.actor === "self" ? "You" : msg.data.user_name}
              </div>
              <div className="MsgListItem">
                <span className="MsgListItemValue">
                  <span className="MsgListItemValueText">{msg.data.text}</span>
                  <span className="MsgListItemValueTime">
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
