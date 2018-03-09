import { Component } from 'react'
import { connect } from 'react-redux'

import { sendAction, toggleSearch } from 'actions'

import { ColumnContainer, ColumnMain } from 'components/ColumnLayout'
import { RowContainer } from 'components/RowLayout'
import Header from './components/Header'
import ShowSearch from './components/ShowSearch'
import Message from './components/Message'
import PlaylistItem from './components/PlaylistItem'

class Playlist extends Component {
  render() {
    const {
      playlist,
      currentPlayingVideoId,
      isConnected,
      toggleSearch,
      onSelect,
      onDelete,
    } = this.props

    return (
      <ColumnContainer>
        <RowContainer>
          <Header/>
          <ShowSearch onShow={toggleSearch} />
        </RowContainer>
        <ColumnMain>
          {
            playlist.size === 0 ?
              <Message/> :
              playlist.map((data, index) =>
                <PlaylistItem
                  key={data.id.videoId}
                  index={index}
                  data={data}
                  currentPlayingVideoId={currentPlayingVideoId}
                  isConnected={isConnected}
                  onSelect={onSelect}
                  onDelete={onDelete} />
            )
          }
        </ColumnMain>
      </ColumnContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.roomState.get('playlist'),
    currentPlayingVideoId: state.playerState.get('videoId'),
    isConnected: state.isConnected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSearch: () => dispatch(toggleSearch()),
    onSelect: videoId => dispatch(sendAction('PLAY', videoId)),
    onDelete: index => dispatch(sendAction('DELETE_VIDEO', index)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist)

export default C
