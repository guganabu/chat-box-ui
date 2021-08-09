import React from "react"
import "./UserPreference.scss"

export default class UserPreference extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputName: "",
    }
  }
  handleSave = () => {
    console.log("submitted", this.state.inputName)
    return this.props.handleSave({
      name: this.state.inputName,
    })
  }

  handleChange = (event) => {
    this.setState({ inputName: event.target.value })
  }
  render() {
    return (
      <div className="user-pref-container">
        <div className="input-container">
          <div className="input-name">
            <span className="label">Enter your name</span>
            <input
              className="input"
              name="inputName"
              value={this.state.inputName}
              onChange={this.handleChange}
            ></input>
          </div>
        </div>
        <div className="action-container">
          <button className="button" onClick={this.handleSave}>
            Join
          </button>
        </div>
      </div>
    )
  }
}
