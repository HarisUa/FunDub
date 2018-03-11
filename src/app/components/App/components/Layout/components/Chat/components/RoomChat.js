import { Component, PropTypes } from 'react'
import GitHubForkRibbon from 'react-github-fork-ribbon'

export default class RoomChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      message: ''
    }

    const { chat } = this.props

    this._handleChange = this._handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChange(message) {
    if (message.target.value) { 
      this.setState({ error: false }); 
    } else this.setState({ error: true })
  }

  _handleSubmit(e) {
    e.preventDefault();
    if(!this.refs.input.value) this.setState({ error: true })
    else { 
      this.props.onSubmit(this.refs.input.value);
      this.refs.input.value = '';
    }
  }

  render() {

    const { error } = this.state

    const fieldCN = error ?
      'field error' :
      'field'

    return (
      <div>
        <form
          className="ui large form"
          onSubmit={this._handleSubmit}>
          <div className={fieldCN}>
            <div className="ui left icon input">
              <input
                ref="input"
                type="text"
                placeholder="Enter message..."
                onChange={this._handleChange} />
                <i className="send icon"></i>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

RoomChat.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
