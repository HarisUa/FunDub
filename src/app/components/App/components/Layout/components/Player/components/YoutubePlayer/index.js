import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'
import { sendAction } from 'actions'

import PlayerOverlay from './components/PlayerOverlay'

class YoutubePlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: getPlayerWidth(),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { player, isPlaying } = this.props

    if (!player || nextProps.isPlaying === this.props.isPlaying)
      return

    if (nextProps.isPlaying) {
      player.playVideo()
    } else {
      player.pauseVideo()
    }
  }

  render() {
    const {
      setPlayer,
      videoId,
      onPause
    } = this.props
    const { width } = this.state
    const height = width === 1280 ? 720 : 480

    const containerStyle = {
      height,
      width,
      marginBottom: 10,
      position: 'relative',
    }

    const opts = {
      height,
      width,
      playerVars: {
        autoplay: 1,
        showinfo: 0,
        controls: 0
      }
    }

    return (
      <div style={containerStyle}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={e => setPlayer(e.target)} onEnd={this.props.onNext}/>
        {videoId ? null : <PlayerOverlay/>}
      </div>
    )
  }
}

YoutubePlayer.propTypes = {
  player: PropTypes.object,
  videoId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setPlayer: PropTypes.func.isRequired,
}

function getPlayerWidth() {
  return window.innerWidth > 1800 ? 1280 : 853
}

const mapDispatchToProps = dispatch => {
    return {
        onNext: () => dispatch(sendAction('PLAY_NEXT')),
    }
}

const C = connect(null, mapDispatchToProps)(YoutubePlayer)

export default C
