import { Component } from 'react'
import { connect } from 'react-redux'

import Search from './components/Search'
import Player from './components/Player'
import Playlist from './components/Playlist'

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  height: '100%',
  width: '100%',
  padding: '0 10px',
}

const style = {
  overflowY: 'auto',
  position: 'relative',
}

const itemStyle = Object.assign({
  flex: 1,
  marginLeft: 10,
  minWidth: 500,
}, style)

const Layout = ({ showSidebar, showSearch }) => (
  <div style={containerStyle}>
    <div style={style}>
      <Player/>
    </div>
    {
      showSidebar ?
        <div style={itemStyle}>
          {
            showSearch ?
              <Search/> :
              <Playlist/>
          }
        </div> :
        null
    }
  </div>
)

const mapStateToProps = state => {
  return {
    showSidebar: state.showSidebar,
    showSearch: state.showSearch,
  }
}

const C = connect(
  mapStateToProps
)(Layout)

export default C
