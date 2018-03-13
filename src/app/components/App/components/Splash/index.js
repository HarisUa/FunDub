import { Component, PropTypes } from 'react'
import Header from './components/Header'
import GoogleLogin from 'react-google-login'

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

const loginStyle = {
    width: '370px',
    display: 'inline-block',
    background: 'rgb(209, 72, 54)',
    color: 'rgb(255, 255, 255)',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '2px',
    border: '1px solid transparent',
    fontSize: '21px',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
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
    this._responseGoogle = this._responseGoogle.bind(this)
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

  _responseGoogle(e) {
    if(!e.profileObj.name) {
      this.setState({ errorName: true })
    } else {
      if(!this.state.room) {
        this.props.onSubmit(e.profileObj.name)
        this.setState({ username: e.profileObj.name });
        this.setState({ errorName: false });
      } else {
        this.props.onSubmit(e.profileObj.name, this.state.room);
        this.setState({ username: e.profileObj.name });
        this.setState({ errorName: false });
      }
    }
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
            <div
              className={formCN}>
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
              <GoogleLogin
                  clientId={'995736415176-i302e266c5arvdeg04sjdvmsft85lbin.apps.googleusercontent.com'}
                  onSuccess={this._responseGoogle}
                  onFailure={this._responseGoogle}
                  style={loginStyle}
              >
                <i className="youtube icon"></i>
                <i className="google plus icon"></i>
                {/*<span> Login </span>*/}
              </GoogleLogin>
            </div>
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
