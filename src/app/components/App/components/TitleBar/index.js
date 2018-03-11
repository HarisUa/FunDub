import { Component } from 'react'
import { connect } from 'react-redux'

import { toggleSidebar, toggleSearch } from 'actions'

import { RowContainer } from 'components/RowLayout'
import Brand from './components/Brand'
import UserNumber from './components/UserNumber'
import SecretTag from './components/SecretTag'
import Username from './components/Username'
import Connecting from './components/Connecting'
import ToggleSidebarButton from './components/ToggleSidebarButton'

class TitleBar extends Component {

  getPlayingTitleFromPlaylist(playlist, currentPlayingVideoId) {

    const playing = playlist.filter(element => element.id.videoId == currentPlayingVideoId)

    const result = { value : '' }

    playing.map(function (element) {
        result.value = element.snippet.title
    })

    return result.value
  }

  render() {
    const {
      isConnected,
      numberOfUsers,
      roomName,
      username,
      showSidebar,
      toggleSidebar,
      currentPlayingVideoId,
      playlist
    } = this.props

    return (
      <RowContainer>
        <RowContainer>
          <Brand playingTitle={this.getPlayingTitleFromPlaylist(playlist, currentPlayingVideoId)} />
          <UserNumber number={numberOfUsers} />
          <SecretTag username={roomName} />
        </RowContainer>
        { isConnected ? null : <Connecting/> }
        <RowContainer>
          <Username username={username} />
          <ToggleSidebarButton
            showSidebar={showSidebar}
            onClick={toggleSidebar} />
        </RowContainer>
      </RowContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    isConnected: state.isConnected,
    numberOfUsers: state.roomState.get('numberOfUsers'),
    roomName: state.roomState.get('name'),
    username: state.username,
    showSidebar: state.showSidebar,
    currentPlayingVideoId: state.playerState.get('videoId'),
    playlist: state.roomState.get('playlist'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar)

export default C
