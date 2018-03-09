import express from 'express'
import { Server } from 'http'
import SocketIO from 'socket.io'
import { List } from 'immutable'
import md5 from 'md5'

import { getNumberOfUsersInRoom } from './utils'

//////////////////////////////////////////////
// Global state data
const rooms = {
  defaultRoom: {
    playlist: List(),
    currentPlayingVideoId: '',
  },
  secretRoom: {
    playlist: List(),
    currentPlayingVideoId: '',
  }
}

// mutate the global state
function updateData(room, field, data) {
  rooms[room][field] = data
}
//////////////////////////////////////////////

const app = express()
const http = Server(app)
const io = SocketIO(http)

io.on('connection', socket => {
  let room = 'defaultRoom'
  let username = 'Super-Bat-Iron-Spider-Man'

  socket.on('new user', data => {
    username = data.name.trim() || username

    if (username) {
      room = data.room;
	  if (!rooms.hasOwnProperty(room)) rooms[room] = { playlist: List(), currentPlayingVideoId: '', }
    }

    socket.join(room)

    // notify users in the room
    socket.broadcast.to(room).emit('new user', username)

    // send initial data
    const { playlist, currentPlayingVideoId } = rooms[room]

    socket.emit('welcome', {
      room,
      numberOfUsers: getNumberOfUsersInRoom(io, room),
      playlist: playlist.toArray()
    })

    socket.emit('action', {
      type: 'PLAY',
      data: currentPlayingVideoId
    })
  })

  socket.on('action', msg => {
    io.in(room).emit('action', msg)

    // store on server
    let field = 'playlist'
    switch (msg.type) {
      case 'ADD_VIDEO':
        return updateData(room, field, rooms[room][field].push(msg.data))
      case 'DELETE_VIDEO':
        return updateData(room, field, rooms[room][field].delete(msg.data))
      case 'PLAY':
        field = 'currentPlayingVideoId'
        return updateData(room, field, msg.data)
      default:
        return
    }
  })

  socket.on('disconnect', () => {
    io.in(room).emit('lost user', username)

    // clean up data
    if (getNumberOfUsersInRoom(io, room) === 0) {
      updateData(room, 'playlist', List())
      updateData(room, 'currentPlayingVideoId', '')
    }
  })
})

const PORT = 3000
http.listen(PORT, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening on port: ${PORT}`)
})

export default app
