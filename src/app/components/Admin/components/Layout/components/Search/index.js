import { Component } from 'react'
import { connect } from 'react-redux'

import { setSearchTerm, search, sendAction, toggleSearch } from 'actions'
import { getVideoIndex } from 'utils'

import { ColumnContainer, ColumnMain } from 'components/ColumnLayout'
import { RowContainer, RowMain } from 'components/RowLayout'
import SearchInput from './components/SearchInput'
import HideSearch from './components/HideSearch'
import SearchResult from './components/SearchResult'

class Search extends Component {
  render() {
    const {
      isSearching,
      searchTerm,
      searchResult,
      searchError,
      playlist,
      isConnected,
      toggleSearch,
      setSearchTerm,
      onSearch,
      onAdd,
    } = this.props

    return (
      <ColumnContainer>
        <RowContainer style={{marginBottom: 10}}>
          <RowMain style={{marginRight: 10}}>
            <SearchInput
              isSearching={isSearching}
              value={searchTerm}
              onChange={setSearchTerm}
              onSearch={onSearch} />
          </RowMain>
          <HideSearch onHide={toggleSearch} />
        </RowContainer>
        <ColumnMain>
          <SearchResult
            data={searchResult}
            getIsInPlaylist={videoId => getVideoIndex(playlist, videoId) !== -1}
            isConnected={isConnected}
            onAdd={onAdd} />
        </ColumnMain>
      </ColumnContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSearching: state.isSearching,
    searchTerm: state.searchTerm,
    searchResult: state.searchResult,
    searchError: state.searchError,
    playlist: state.roomState.get('playlist'),
    isConnected: state.isConnected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSearch: () => dispatch(toggleSearch()),
    setSearchTerm: text => dispatch(setSearchTerm(text)),
    onSearch: text => dispatch(search(text)),
    onAdd: data => dispatch(sendAction('ADD_VIDEO', data)),
  }
}

const C = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default C
