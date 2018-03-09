import { Component, PropTypes } from 'react'

import { ListItem, ListItemControl } from 'components/ListItem'
import Item from './components/Item'
import PeekButton from './components/PeekButton'
import AddButton from './components/AddButton'
import AddLabel from './components/AddLabel'

export default class SearchResultItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      peeking: false,
      isAdding: false
    }
    this._handleTogglePeek = this._handleTogglePeek.bind(this)
    this._handleAdd = this._handleAdd.bind(this)
  }

  componentWillReceiveProps({ isInPlaylist }) {
    if (!isInPlaylist)
      this.setState({ isAdding: false })
  }

  _handleTogglePeek() {
    this.setState({
      peeking: !this.state.peeking
    })
  }

  _handleAdd() {
    const { data, onAdd } = this.props

    this.setState({ isAdding: true })
    onAdd(data)
  }

  render() {
    const { data, isInPlaylist, isConnected } = this.props
    const { peeking } = this.state

    return (
      <ListItem>
        <Item
          peeking={peeking}
          data={this.props.data} />
        <ListItemControl>
          <PeekButton
            peeking={peeking}
            onClick={this._handleTogglePeek} />
          {
            isInPlaylist ?
              <AddLabel/> :
              <AddButton
                isAdding={this.state.isAdding}
                disabled={!isConnected}
                onClick={this._handleAdd} />
          }
        </ListItemControl>
      </ListItem>
    )
  }
}

SearchResultItem.propTypes = {
  data: PropTypes.object.isRequired,
  isInPlaylist: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
}
