import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Rooms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    }
  }

  _handleRoom(e) {
    this.props.onSubmit(e);
  }

  componentDidMount() {
    fetch('/api/rooms')
        .then(res => res.json())
        .then(rooms => {this.setState({ rooms })});
    }

    componentDidUpdate() {
    fetch('/api/rooms')
        .then(res => res.json())
        .then(rooms => {this.setState({ rooms })});
    }

  render() {

    var arr = Object.values(this.state.rooms);

    return (
      <div>
        <div className="ui link centered cards">
        { 
          arr.map((item, i) =>
            <div className="card" onClick={(e) => this._handleRoom(item.owner) } key={i}>
              <div className="image">
                <img src={(item.currentPlayingVideoId && item.currentPlayingVideoId.snippet) ? item.currentPlayingVideoId.snippet.thumbnails.high.url : 'https://i.ytimg.com/vi/yXek9F-bwTE/maxresdefault.jpg'} />
              </div>
              <div className="content">
                <p className="header">{ item.name }</p>
                <p className="meta">hosted by { item.owner }</p>
              </div>
              <div className="extra content">
                <span>
                  {(item.currentPlayingVideoId && item.currentPlayingVideoId.snippet) ? item.currentPlayingVideoId.snippet.title : 'No Video Title'}
                </span>
              </div>
            </div>
          )
        }
        </div>
      </div>
    )
  }

}

Rooms.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}


export default Rooms
