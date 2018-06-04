import { Component } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'

import { checkUserid, setNotificationSystem } from 'actions'

import TitleBar from './components/TitleBar'
import Layout from './components/Layout'
import Splash from './components/Splash'
import Notification from './components/Notification'
import Dashboard from './components/Dashboard'


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

const App = ({ admin, isSendingUsername, checkUserid, setNotificationSystem }) => {
  const content = admin ?
    <Dashboard /> :
    <Splash
      isSendingUsername={isSendingUsername}
      onSubmit={checkUserid} />
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
    admin: state.adminChecked,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkUserid: (id) => dispatch(checkUserid(id)),
    setNotificationSystem: ns => dispatch(setNotificationSystem(ns)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default C
