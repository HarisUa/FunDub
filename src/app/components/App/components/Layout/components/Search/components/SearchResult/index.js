import { Component, PropTypes } from 'react'

import SearchResultItem from './components/SearchResultItem'

export default class SearchResult extends Component {
  render() {
    const { data, getIsInPlaylist, isConnected, onAdd } = this.props

    return (
      <div>
        {
          data.map((o, index) =>
            <SearchResultItem
              key={index}
              data={o}
              isInPlaylist={getIsInPlaylist(o.id.videoId)}
              isConnected={isConnected}
              onAdd={onAdd} />
          )
        }
      </div>
    )
  }
}

SearchResult.propTypes = {
  data: PropTypes.array.isRequired,
  isConnected: PropTypes.bool.isRequired,
  getIsInPlaylist: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}
