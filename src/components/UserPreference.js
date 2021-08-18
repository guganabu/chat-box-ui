import React from "react"
import "./UserPreference.scss"

export default class UserPreference extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputName: "",
    }
  }
  joinChat = () => {
    this.props.sendAction({
      name: this.state.inputName,
    })
  }

  handleChange = (event) => {
    this.setState({ inputName: event.target.value })
  }
  render() {
    return (
      <div className="UserPrefContainer">
        <div className="InputContainer">
          <div className="InputName">
            <span className="Label">Enter your name</span>
            <input
              className="Input"
              name="inputName"
              value={this.state.inputName}
              onChange={this.handleChange}
            ></input>
          </div>
        </div>
        <div className="ActionContainer">
          <button className="Button" onClick={this.joinChat}>
            Join Chat
          </button>
        </div>
      </div>
    )
  }
}
