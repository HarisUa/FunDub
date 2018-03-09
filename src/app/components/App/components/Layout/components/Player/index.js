import { Component } from 'react'
import { connect } from 'react-redux'

import { setPlayer } from 'actions'

import YoutubePlayer from './components/YoutubePlayer'
import PlayerControl from './components/PlayerControl'
import PlayerNotice from './components/PlayerNotice'

class Player extends Component {
  render() {
    const {
      player,
      currentPlayingVideoId,
      isPlaying,
      setPlayer,
    } = this.props

    return (
      <div>
        <YoutubePlayer
          setPlayer={setPlayer}
          player={player}
          videoId={currentPlayingVideoId}
          isPlaying={isPlaying} />
        <PlayerControl/>
        <PlayerNotice/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    currentPlayingVideoId: state.playerState.get('videoId'),
    isPlaying: state.playerState.get('isPlaying'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayer: player => dispatch(setPlayer(player)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default C
