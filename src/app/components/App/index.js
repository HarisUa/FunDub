import { Component } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'

import { sendUsername, setNotificationSystem } from 'actions'

import TitleBar from './components/TitleBar'
import Layout from './components/Layout'
import Splash from './components/Splash'
import Notification from './components/Notification'

const containerStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
}

const mainStyle = {
  flex: 1,
  position: 'relative',
}

const App = ({ roomName, isSendingUsername, sendUsername, setNotificationSystem }) => {
  const content = roomName ?
    <div style={containerStyle}>
      <div style={{padding: 10}}>
        <TitleBar/>
      </div>
      <div style={mainStyle}>
        <Layout/>
      </div>
    </div> :
    <Splash
      isSendingUsername={isSendingUsername}
      onSubmit={sendUsername} />

  return (
    <div>
      { content }
      <Notification onReady={setNotificationSystem} />
      <ReactTooltip
        effect="solid"
        place="left"/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    roomName: state.roomState.get('name'),
    isSendingUsername: state.isSendingMap.get('USERNAME'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendUsername: (name, room) => dispatch(sendUsername(name, room)),
    setNotificationSystem: ns => dispatch(setNotificationSystem(ns)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default C
