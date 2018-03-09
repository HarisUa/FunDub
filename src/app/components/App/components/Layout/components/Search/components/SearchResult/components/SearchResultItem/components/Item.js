import YouTube from 'react-youtube'

import VideoInfo from 'components/VideoInfo'

const Item = ({ peeking, data }) => {
  if (peeking) {
    const { id: { videoId } } = data
    const opts = {
      height: '240',
      width: '400',
      playerVars: {
        autoplay: 1
      }
    }
    return (
      <div><div>
        <YouTube
          videoId={videoId}
          opts={opts} />
      </div></div>
    )
  }

  return <VideoInfo data={data} />
}

export default Item
