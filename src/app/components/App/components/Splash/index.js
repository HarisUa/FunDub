import { Component, PropTypes } from 'react'
import GitHubForkRibbon from 'react-github-fork-ribbon'

import Header from './components/Header'
import ErrorMessage from './components/ErrorMessage'

const containerStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}

const segmentStyle = {
  minWidth: 400
}

export default class Splash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorName: false,
      errorRoom: false,
      username: '',
      room: '',
    }

    this._handleUserChange = this._handleUserChange.bind(this)
    this._handleRoomChange = this._handleRoomChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleUserChange(user) {
    if (user.target.value) { 
      this.setState({ username: user.target.value }); 
      this.setState({ errorName: false }); 
    } else this.setState({ errorName: true })
  }

  _handleRoomChange(room) {
    this.setState({ room: room.target.value }); 
  }

  _handleSubmit(e) {
    e.preventDefault();
    (!this.state.username) ? this.setState({ errorName: true }) :
    (!this.state.room) ? this.props.onSubmit(this.state.username) :
      this.props.onSubmit(this.state.username, this.state.room);
  }

  render() {
    const formCN = this.props.isSendingUsername ?
      'ui large loading form' :
      'ui large form'

    const { errorName, errorRoom } = this.state
    const fieldCN = errorName ?
      'field error' :
      'field'

    const fieldRoom = errorRoom ?
      'field error' :
      'field'

    return (
      <div style={containerStyle}>
        <div style={segmentStyle}>
          <div className="ui segment">
            <Header/>
            <form
              className={formCN}
              onSubmit={this._handleSubmit}>
              <div className={fieldCN}>
                <div className="ui left icon input">
                  <input
                    ref="input"
                    name="user"
                    type="text"
                    placeholder="Enter user name..."
                    onChange={this._handleUserChange} />
                  <i className="user icon"></i>
                </div>
              </div>
              <div className={fieldRoom}>
                <div className="ui left icon input">
                  <input
                    ref="input"
                    name="room"
                    type="text"
                    placeholder="Enter room name..."
                    onChange={this._handleRoomChange} />
                  <i className="ticket icon"></i>
                </div>
              </div>
              <button
                className="ui fluid large teal submit button"
                type="submit">
                OK
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Splash.propTypes = {
  isSendingUsername: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}
