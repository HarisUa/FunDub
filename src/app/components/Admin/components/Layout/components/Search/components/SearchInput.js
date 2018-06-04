import { Component, PropTypes } from 'react'

export default class SearchInput extends Component {
  constructor(props) {
    super(props)
    this._handleEnter = this._handleEnter.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange(e) {
    const text = e.target.value
    this.props.onChange(text)
  }

  _handleEnter(e) {
    if (e.key === 'Enter') {
      const { value, onSearch } = this.props
      if (value) {
        onSearch(value)
      }
    }
  }

  render() {
    const { isSearching, value } = this.props
    const cn = `ui fluid left icon input${isSearching ? ' loading' : ''}`

    return (
      <div className={cn}>
        <input
          type="text"
          value={value}
          onKeyPress={this._handleEnter}
          onChange={this._handleChange}
          placeholder="Press enter to search..." />
        <i className="search icon"></i>
      </div>
    )
  }
}

SearchInput.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
}
