import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const loginStyle = {
    paddingTop: '10px',
    paddingBottom: '10px',
}

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      room: '',
    }

    this._handleRoomChange = this._handleRoomChange.bind(this)
  }

  _handleRoomChange(room) {
    this.setState({ room: room.target.value }); 
    console.log(this.state.room)
  }

  _handleRoom(e) {
    this.props.onSubmit(e);
  }

  render() {
    return (
      <div className="ui center aligned basic segment">
        <div className="field">
          <div className="ui left icon input" style={loginStyle}>
            <input
              ref="input"
              name="room"
              type="text"
              placeholder="Enter room name..."
              onChange={this._handleRoomChange} />
            <i className="ticket icon"></i>
          </div>
        </div>
        <div 
          className="ui teal labeled icon button"
          onClick={(e) => this._handleRoom(this.state.room) }>
          Create New Room
          <i className="add icon"></i>
        </div>
        <div className="ui horizontal divider">
          Or
        </div>
      </div>
    )
  }
}

Create.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Create