import { Component, PropTypes } from 'react'

import { ListItem, ListItemControl } from 'components/ListItem'
import VideoInfo from 'components/VideoInfo'
import PlayButton from './components/PlayButton'
import DeleteButton from './components/DeleteButton'

export default class PlaylistItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelecting: false,
      isDeleting: false
    }
    this._handleDeleteClick = this._handleDeleteClick.bind(this)
    this._handlePlayClick = this._handlePlayClick.bind(this)
  }

  componentWillReceiveProps({ data, currentPlayingVideoId }) {
    if (data.id.videoId !== currentPlayingVideoId)
      this.setState({ isSelecting: false })
  }

  _handleDeleteClick() {
    const { index, onDelete } = this.props

    this.setState({ isDeleting: true })
    onDelete(index)
  }

  _handlePlayClick() {
    const { data, onSelect } = this.props

    this.setState({ isSelecting: true })
    onSelect(data.id.videoId)
  }

  render() {
    const { data, currentPlayingVideoId, isConnected } = this.props

    return (
      <ListItem>
        <VideoInfo data={data} />
        <ListItemControl>
          {
            currentPlayingVideoId === data.id.videoId ?
              null :
              <PlayButton
                isSelecting={this.state.isSelecting}
                disabled={!isConnected}
                onClick={this._handlePlayClick} />
          }
          <DeleteButton
            isDeleting={this.state.isDeleting}
            disabled={!isConnected}
            onClick={this._handleDeleteClick} />
        </ListItemControl>
      </ListItem>
    )
  }
}

PlaylistItem.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  currentPlayingVideoId: PropTypes.string.isRequired,
  isConnected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
