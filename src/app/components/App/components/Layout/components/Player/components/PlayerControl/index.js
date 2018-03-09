import { Component } from 'react'
import { connect } from 'react-redux'

import { getNextVideoId, getPreviousVideoId } from 'utils'
import { sendAction } from 'actions'

import { RowContainer } from 'components/RowLayout'
import {
  PauseButton,
  ResumeButton,
  PrevButton,
  NextButton,
  SyncButton,
} from './components/PlayerControlButtons'

class PlayerControl extends Component {
  render() {
    const {
      player,
      playlist,
      currentPlayingVideoId,
      isPlaying,
      isSendingMap,
      isConnected,
      onPause,
      onResume,
      onNext,
      onPrevious,
      onSync,
    } = this.props

    return (
      <RowContainer>
        <div>
          {
            isPlaying ?
              <PauseButton
                isSending={isSendingMap.get('PAUSE')}
                disabled={!isConnected || currentPlayingVideoId === ''}
                onPause={onPause} /> :
              <ResumeButton
                isSending={isSendingMap.get('RESUME')}
                disabled={!isConnected || currentPlayingVideoId === ''}
                onResume={onResume} />
          }
          <PrevButton
            isSending={isSendingMap.get('PLAY_PREVIOUS')}
            disabled={!isConnected || getPreviousVideoId(playlist, currentPlayingVideoId) === ''}
            onPrevious={onPrevious} />
          <NextButton
            isSending={isSendingMap.get('PLAY_NEXT')}
            disabled={!isConnected || getNextVideoId(playlist, currentPlayingVideoId) === ''}
            onNext={onNext} />
        </div>
        <div>
          <SyncButton
            isSending={isSendingMap.get('SYNC_TIME')}
            disabled={!isConnected || currentPlayingVideoId === ''}
            onSync={() => onSync(player.getCurrentTime())} />
        </div>
      </RowContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    playlist: state.roomState.get('playlist'),
    currentPlayingVideoId: state.playerState.get('videoId'),
    isPlaying: state.playerState.get('isPlaying'),
    isSendingMap: state.isSendingMap,
    isConnected: state.isConnected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPause: () => dispatch(sendAction('PAUSE')),
    onResume: () => dispatch(sendAction('RESUME')),
    onNext: () => dispatch(sendAction('PLAY_NEXT')),
    onPrevious: () => dispatch(sendAction('PLAY_PREVIOUS')),
    onSync: time => dispatch(sendAction('SYNC_TIME', time)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerControl)

export default C
