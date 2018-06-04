import { Component, PropTypes } from 'react'
import Header from './components/Header'
import Rooms from './components/Rooms'
import Create from './components/Create'
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
      userid: '',
    }

    this._handleUserChange = this._handleUserChange.bind(this)
    this._handleRoomChange = this._handleRoomChange.bind(this)
    this._responseGoogle = this._responseGoogle.bind(this)
  }

  _handleUserChange(user) {
    if (user.target.value) { 
      this.setState({ userid: user.target.value }); 
      this.setState({ errorName: false }); 
    } else this.setState({ errorName: true })
  }

  _handleRoomChange(room) {
    this.setState({ room }); 
    this.props.onSubmit(this.state.userid, room);
  }

  _responseGoogle(e) {
    if(!e.profileObj.name) {
      this.setState({ errorName: true })
    } else {
      if(!this.state.room) {
        this.props.onSubmit(e.profileObj.googleId)
        this.setState({ userid: e.profileObj.googleId });
        this.setState({ errorName: false });
      }
        
    }
  }

  render() {
    const formCN = this.props.isSendingUsername ?
      'ui large loading form' :
      'ui large form'

    const { errorName, errorRoom, userid } = this.state
    const fieldCN = errorName ?
      'field error' :
      'field'

    const fieldRoom = errorRoom ?
      'field error' :
      'field'

    const content = 
      <div style={containerStyle}>
        <div style={segmentStyle}>
          <div className="ui segment">
            <Header/>
            <div
              className={formCN}>
              <GoogleLogin
                  clientId={'995736415176-i302e266c5arvdeg04sjdvmsft85lbin.apps.googleusercontent.com'}
                  onSuccess={this._responseGoogle}
                  onFailure={this._responseGoogle}
                  style={loginStyle}
              >
                <i className="youtube icon"></i> 
                <span> Login With Google </span>
              </GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    return (
      <div>
        { content }
      </div>
    )
  }
}

Splash.propTypes = {
  isSendingUsername: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}
