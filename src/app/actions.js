import { stringify } from 'qs'
import { Map, List } from 'immutable'
import io from 'socket.io-client'
import fetch from 'isomorphic-fetch'

import { SEARCH_API, API_KEY } from './config'
import { getVideoIndex, getNextVideoId, getPreviousVideoId } from './utils'

export function search(text) {
  return dispatch => {
    dispatch({ type: 'SEARCH' })

    const searchParams = {
      part: 'snippet',
      key: API_KEY,
      q: text,
      type: 'video',
      maxResults: 30
    }
    const url = `${SEARCH_API}?${stringify(searchParams)}`

    fetch(url, {
      mode: 'cors'
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }

      throw res
    })
    .then(data => dispatch(setSearchResult(data.items)))
    .catch(err => dispatch(setSearchError(err)))
  }
}

export function setSearchTerm(text) {
  return { type: 'SET_SEARCH_TERM', text }
}

function setSearchResult(data) {
  return { type: 'SET_SEARCH_RESULT', data }
}

function setSearchError(error) {
  return { type: 'SET_SEARCH_ERROR', error}
}

export function setUpSocket() {
  return (dispatch, getState) => {
    const socket = io()
    dispatch({ type: 'SET_SOCKET', socket })

    socket.on('connect', () => {
      dispatch(setConnected(true))

      const { username } = getState()
      if (username) {
        dispatch(sendUsername(username))
        dispatch(notify({
          message: 'Connect to server!',
          level: 'success',
        }))
      }
    })

    socket.on('action', msg => {
      dispatch(notify({
        message: `Action performed: ${msg.type}`,
        level: 'info',
      }))

      switch (msg.type) {
        case 'ADD_VIDEO':
          return dispatch(addVideo(msg.data))
        case 'DELETE_VIDEO':
          return dispatch(deleteVideo(msg.data))
        case 'PLAY':
          return dispatch(play(msg.data))
        case 'PLAY_NEXT':
          return dispatch(playNext())
        case 'PLAY_PREVIOUS':
          return dispatch(playPrevious())
        case 'PAUSE':
          return dispatch(pause())
        case 'RESUME':
          return dispatch(resume())
        case 'SYNC_TIME':
          return dispatch(syncTime(msg.data))
        default:
          return
      }
    })

    socket.on('welcome', msg => {
      dispatch(setRoomState(msg))
    })

    socket.on('new user', msg => {
      dispatch({ type: 'INCREMENT_USER_NUMBER' })
      dispatch(notify({
        message: `User: ${msg} just joined!`,
        level: 'success',
      }))
    })

    socket.on('new message', msg => {
      dispatch({ type: 'NEW_MESSAGE', msg })
    })

    socket.on('lost user', msg => {
      dispatch({ type: 'DECREMENT_USER_NUMBER' })
      dispatch(notify({
        message: `User: ${msg} has left.`,
        level: 'warning',
      }))
    })

    socket.on('disconnect', () => {
      dispatch(setConnected(false))
      dispatch(notify({
        message: 'Lost connection to server!',
        level: 'error',
      }))
      dispatch(pause())
    })
  }
}

function setConnected(connected) {
  return { type: 'SET_CONNECTED', connected }
}

function setRoomState(data) {
  return { type: 'SET_ROOM_STATE', data }
}

export function sendUsername(username, roomName = 'defaultRoom') {
  return (dispatch, getState) => {
    const { socket } = getState()

    let data = {
      name: username,
      room: roomName,
    }

    if (socket.connected) {
      dispatch({ type: 'SEND_USERNAME', username })
      socket.emit('new user', data)
    }
  }
}

export function sendAction(action, data) {
  return (dispatch, getState) => {
    const { socket } = getState()

    if (socket.connected) {
      dispatch({ type: `SEND_${action}` })
      socket.emit('action', { type: action, data })
    }
  }
}

export function sendMessage(data) {
  return (dispatch, getState) => {
    const { socket } = getState()

    if (socket.connected) {
      socket.emit('send message', data)
    }
  }
}

function addVideo(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_VIDEO', data })

    const { roomState, playerState } = getState()
    const playlist = roomState.get('playlist')
    if (playlist.size === 1) {
      const nextVideoId = getNextVideoId(playlist, playerState.get('videoId'))
      dispatch(sendAction('PLAY', nextVideoId))
    }
  }
}

function deleteVideo(index) {
  return (dispatch, getState) => {
    const { roomState, playerState } = getState()
    const playlist = roomState.get('playlist')
    const currentPlayingVideoId = playerState.get('videoId')
    const currentVideoIndex = getVideoIndex(playlist, currentPlayingVideoId)
    const nextVideoId = getNextVideoId(playlist, currentPlayingVideoId)

    dispatch({ type: 'DELETE_VIDEO', index })

    if (currentVideoIndex === index) {
      dispatch(sendAction('PLAY', nextVideoId))
    }
  }
}

function play(videoId) {
  return { type: 'PLAY', videoId }
}

function pause() {
  return { type: 'PAUSE' }
}

function resume() {
  return { type: 'RESUME' }
}

function playNext() {
  return (dispatch, getState) => {
    const { roomState, playerState } = getState()
    const nextVideoId = getNextVideoId(
      roomState.get('playlist'),
      playerState.get('videoId')
    )
    dispatch({ type: 'PLAY_NEXT', nextVideoId })
  }
}

function playPrevious() {
  return (dispatch, getState) => {
    const { roomState, playerState } = getState()
    const previousVideoId = getPreviousVideoId(
      roomState.get('playlist'),
      playerState.get('videoId')
    )
    dispatch({ type: 'PLAY_PREVIOUS', previousVideoId })
  }
}

function syncTime(time) {
  return (dispatch, getState) => {
    const { player } = getState()
    player.seekTo(time)

    dispatch({ type: 'SYNC_TIME' })
  }
}

export function setPlayer(player) {
  return { type: 'SET_PLAYER', player }
}

export function toggleSidebar() {
  return { type: 'TOGGLE_SIDEBAR' }
}

export function toggleSearch() {
  return { type: 'TOGGLE_SEARCH' }
}

export function toggleList() {
  return { type: 'TOGGLE_LIST' }
}

export function setNotificationSystem(ns) {
  return { type: 'SET_NOTIFICATION_SYSTEM', ns }
}

function notify(msg) {
  return (dispatch, getState) => {
    const { notificationSystem } = getState()
    const notification = Object.assign({
      position: 'br'
    }, msg)
    notificationSystem.addNotification(notification)
  }
}
