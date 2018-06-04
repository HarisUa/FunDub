import { Component, PropTypes } from 'react'
import TimeAgo from 'react-timeago'

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
}

const imgPlaceholderStyle = {
  height: 90,
  backgroundColor: 'rgba(187, 187, 187, 0.85)',
  marginRight: 10,
  position: 'relative',
  flex: '0 0 120px',
}

const imgStyle = {
  position: 'absolute'
}

const titleStyle = {
  fontWeight: 'bold',
  color: '#215BE8',
}

const liveStyle = {
    color: 'hsl(3, 81.8%, 49.6%)',
    border: '1px solid hsl(3, 81.8%, 49.6%)',
    borderRadius: '2px',
}

const linkStyle = {
    color: 'black',
}

export default class VideoInfo extends Component {
  render() {
    const { data } = this.props
    const { snippet } = data || {}

    return (
      <div style={containerStyle}>
        <div style={imgPlaceholderStyle}>
          <img
            style={imgStyle}
            src={snippet.thumbnails.default.url}
            alt="thumbnail"/>
        </div>
        <div>
          <div style={titleStyle}>{snippet.title}</div>
            {
              snippet.liveBroadcastContent == "live" ?
                <span>
                  <small>Streaming by
                    <strong>
                      <a href={'https://www.youtube.com/channel/'+snippet.channelId} target={'_blank'}> {snippet.channelTitle} </a>
                    </strong>
                  </small>
                  <br/>
                  <span style={liveStyle}>LIVE STREAM</span>
                  <br/>
                  <small>Announced <TimeAgo date={snippet.publishedAt} /></small>
                </span>
                  :
                <span>
                  <small>Uploaded by
                    <strong>
                      <a href={'https://www.youtube.com/channel/'+snippet.channelId} target={'_blank'} style={linkStyle}> {snippet.channelTitle} </a>
                    </strong>
                  </small>
                  <br/>
                  <small>Published <TimeAgo date={snippet.publishedAt} /></small>
                </span>
            }
          <br/>

        </div>
      </div>
    )
  }
}

VideoInfo.propTypes = {
  data: PropTypes.object,
}
