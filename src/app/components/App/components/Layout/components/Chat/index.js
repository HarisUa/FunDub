import { Component } from 'react'
import { connect } from 'react-redux'

import { RowContainer } from 'components/RowLayout'
import Header from './components/Header'
import ShowSearch from './components/ShowSearch'

import { sendMessage, toggleList } from 'actions'

import RoomChat from './components/RoomChat'

const nameStyle = {
  color: 'red'
}

class Chat extends Component {
  render() {

    this.state = {
      width: getPlayerWidth(),
    }

    const { width } = this.state
    const height = width === 1280 ? 720 : 480

    const { chatMessages, sendMessage, toggleList } = this.props

    const chatStyle = {
      minHeight: height,
      maxHeight: height,
      overflow: 'auto'
    }

    return (
      <div>
        <RowContainer>
          <Header />
          <ShowSearch onShow={toggleList} />
        </RowContainer>
        <div style={chatStyle}>
          {chatMessages.size === 0 ? 
            <p> Empty... </p> :
            chatMessages.map((data, index) => 
              <p><span style={nameStyle}>{data.user}</span>: {data.message}</p>  
            )}
          </div>
        <RoomChat
          onSubmit={sendMessage} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    chatMessages: state.roomState.get('chatMessages'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleList: () => dispatch(toggleList()),
    sendMessage: message => dispatch(sendMessage(message))
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)

function getPlayerWidth() {
  return window.innerWidth > 1800 ? 1280 : 853
}

export default C

