import { Map, List } from 'immutable'
import io from 'socket.io-client'

export function player(state = null, action) {
  switch (action.type) {
    case 'SET_PLAYER':
      return action.player
    default:
      return state
  }
}

export function socket(state = null, action) {
  switch (action.type) {
    case 'SET_SOCKET':
      return action.socket
    default:
      return state
  }
}

export function isConnected(state = false, action) {
  switch(action.type) {
    case 'SET_CONNECTED':
      return action.connected
    default:
      return state
  }
}

export function notificationSystem(state = null, action) {
  switch (action.type) {
    case 'SET_NOTIFICATION_SYSTEM':
      return action.ns
    default:
      return state
  }
}

export function showSidebar(state = true, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return !state
    default:
      return state
  }
}

export function showSearch(state = false, action) {
  switch (action.type) {
    case 'SET_ROOM_STATE':
      if (action.data.playlist.length === 0) return true
      return false
    case 'TOGGLE_SEARCH':
      return !state
    default:
      return state
  }
}

export function isSearching(state = false, action) {
  switch (action.type) {
    case 'SEARCH':
      return true
    case 'SET_SEARCH_RESULT':
      return false
    case 'SET_SEARCH_ERROR':
      return false
    default:
      return state
  }
}

export function searchTerm(state = '', action) {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return action.text
    default:
      return state
  }
}

export function searchResult(state = [], action) {
  switch (action.type) {
    case 'SET_SEARCH_RESULT':
      return action.data
    default:
      return state
  }
}

export function searchError(state = null, action) {
  switch (action.type) {
    case 'SET_SEARCH_ERROR':
      return action.error
    default:
      return state
  }
}

export function isSendingMap(state = Map(), action) {
  const { type } = action

  if (type === 'SET_ROOM_STATE') {
    return state.set('USERNAME', false)
  }

  // send actions
  const actionArray = [
    'USERNAME',
    'ADD_VIDEO',
    'DELETE_VIDEO',
    'PLAY',
    'PLAY_NEXT',
    'PLAY_PREVIOUS',
    'PAUSE',
    'RESUME',
    'SYNC_TIME',
  ]
  const sendActionArray = actionArray.map(s => `SEND_${s}`)

  if (actionArray.indexOf(type) >= 0) {
    return state.set(type, false)
  }

  if (sendActionArray.indexOf(type) >= 0) {
    const act = type.substring(5)
    return state.set(act, true)
  }

  return state
}

export function username(state = '', action) {
  switch (action.type) {
    case 'SEND_USERNAME':
      return action.username
    default:
      return state
  }
}

const defaultRoomState = Map({
  room: '',
  numberOfUsers: 0,
  playlist: List(),
})
export function roomState(state = defaultRoomState, action) {
  switch (action.type) {
    case 'SET_ROOM_STATE':
      const { room, numberOfUsers, playlist } = action.data
      return Map({
        name: room,
        numberOfUsers,
        playlist: List(playlist)
      })
    case 'INCREMENT_USER_NUMBER':
      return state.set('numberOfUsers',
        state.get('numberOfUsers') + 1)
    case 'DECREMENT_USER_NUMBER':
      return state.set('numberOfUsers',
        state.get('numberOfUsers') - 1)
    case 'ADD_VIDEO':
      return state.set('playlist',
        state.get('playlist').push(action.data))
    case 'DELETE_VIDEO':
      return state.set('playlist',
        state.get('playlist').delete(action.index))
    default:
      return state
  }
}

const defaultPlayerState = Map({
  videoId: '',
  isPlaying: false,
})
export function playerState(state = defaultPlayerState, action) {
  switch (action.type) {
    case 'PLAY':
      const { videoId } = action
      return state.set('videoId', videoId).set('isPlaying', videoId ? true : false)
    case 'PLAY_NEXT':
      return state.set('videoId', action.nextVideoId)
    case 'PLAY_PREVIOUS':
      return state.set('videoId', action.previousVideoId)
    case 'PAUSE':
      return state.set('isPlaying', false)
    case 'RESUME':
      return state.set('isPlaying', true)
    default:
      return state
  }
}
