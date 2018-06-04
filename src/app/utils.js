import isNull from 'lodash/isNull'
import random from 'lodash/random'

export function getVideoIndex(playlist, videoId) {
  return playlist.findIndex(video => {
    return video.id.videoId === videoId
  })
}

export function getNextVideoId(playlist, currentVideoId) {
  if (!currentVideoId) {
    const first = playlist.first()
    if (first) {
      return first
    } else {
      return ''
    }
  }

  const index = getVideoIndex(playlist, currentVideoId) + 1
  const video = playlist.get(index)
  if (video) {
    return video
  }

  return ''
}

export function getPreviousVideoId(playlist, currentVideoId) {
  if (!currentVideoId) {
    return ''
  }

  const index = getVideoIndex(playlist, currentVideoId) - 1
  if (index < 0) return ''
  return playlist.get(index)
}

let previousNum = null
export function generateNonDupInt(low, high) {
  const result = random(low, high)

  // first time generate
  if (isNull(previousNum)) return result

  if (result !== previousNum) {
    previousNum = result
    return result
  }

  return generateNonDupInt(low, high)
}
