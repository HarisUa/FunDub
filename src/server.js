import express from 'express'
import { Server } from 'http'
import SocketIO from 'socket.io'
import { List } from 'immutable'
import md5 from 'md5'

import { getNumberOfUsersInRoom } from './utils'

//////////////////////////////////////////////
// Global state data
const rooms = {
  'Admin': {
    name: 'default',
    owner: 'Admin',
    playlist: List(),
    currentPlayingVideoId: {
      id: {
        videoId: '',
      },
    },
    users: [],
  },
}

let bans = [];
let admin = false;

let vidCount = 0;
let videos = [];

function addVideo(data) {
  if(videos.length == 0)
    videos.push({ video: data, count: 1});
  else {
    let flag = true;
    videos.map((vid, i) => {
      if (vid.video.id.videoId == data.id.videoId) {
        videos[i].count++;
        flag = false;
      }
    })
    if(flag) videos.push({ video: data, count: 1});
  }
}

function compare(a,b) {
  if (a.count > b.count)
    return -1;
  if (a.count < b.count)
    return 1;
  return 0;
}

function getVideos() {
  videos.sort(compare);

  return videos.slice(0, 5);
}

// mutate the global state
function updateData(room, field, data) {
  rooms[room][field] = data
}
//////////////////////////////////////////////

const app = express()
app.use(express.static('public'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

const http = Server(app)
const io = SocketIO(http)

io.on('connection', socket => {
  let room = ''
  let username = ''

  socket.on('new user', data => {
    username = data.name.trim() || username

    if (bans.indexOf(username) != -1) {
      socket.emit('banned');
      socket.disconnect();
    }

    if (username) {
      room = data.room;
	    if (!rooms.hasOwnProperty(room)) {
        rooms[username] = { name: data.room, owner: username, playlist: List(), currentPlayingVideoId: { id: { videoId: '', }, }, users: [username]}
        room = username;
      }
    }

    socket.join(room)
    if(rooms[room].users.indexOf(username) == -1)
      rooms[room].users.push(username);
    // notify users in the room
    socket.broadcast.to(room).emit('new user', username)

    // send initial data
    const { playlist, currentPlayingVideoId } = rooms[room]

    socket.emit('welcome', {
      room,
      numberOfUsers: getNumberOfUsersInRoom(io, room),
      playlist: playlist.toArray()
    })

    //console.log(currentPlayingVideoId.id.videoId);

    socket.emit('action', {
      type: 'PLAY',
      data: currentPlayingVideoId.id.videoId
    })
  })

  socket.on('send message', data => {

    let messasgeData = {
      user: username,
      message: data,
    }

    console.log(`Message from ${username} to chanel ${room}: ${data}`)
    io.in(room).emit('new message', messasgeData);
  })

  socket.on('checkId', data => {
    if(data.id == '106806161012183378463') {
      admin = true;

      socket.emit('adminChecked', true);
    } else socket.emit('adminChecked', false);
  })

  socket.on('action', msg => {
    io.in(room).emit('action', msg)

    // store on server
    let field = 'playlist'
    switch (msg.type) {
      case 'ADD_VIDEO':
        vidCount++;
        addVideo(msg.data);
        return updateData(room, field, rooms[room][field].push(msg.data))
      case 'DELETE_VIDEO':
        return updateData(room, field, rooms[room][field].delete(msg.data))
      case 'PLAY':
        field = 'currentPlayingVideoId'
        return updateData(room, field, msg.data)
      case 'PLAY_NEXT':
        field = 'currentPlayingVideoId'
        return updateData(room, field, msg.data)
      case 'PLAY_PREVIOUS':
        field = 'currentPlayingVideoId'
        return updateData(room, field, msg.data)
      default:
        return
    }
  })

  socket.on('disconnect', () => {
    if(!(room == '')) {
      io.in(room).emit('lost user', username)

      if(rooms[room].users.indexOf(username) != -1)
        rooms[room].users.splice(rooms[room].users.indexOf(username), 1);

      // clean up data
      if (getNumberOfUsersInRoom(io, room) === 0) {
        updateData(room, 'playlist', List())
        updateData(room, 'currentPlayingVideoId', { id: { videoId: '', }, })
      }
    }
  })
})

const PORT = process.env.PORT || 5000
http.listen(PORT, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening on port: ${PORT}`)
})

app.get('/api/rooms', function(req, res) {
  res.send(JSON.stringify(rooms));
});

app.get('/admin/api/global', function(req, res) {

  let data = {
    rooms: Object.keys(rooms).length,
    users: Object.keys(io.sockets.connected).length,
    sVideos: vidCount,
    vStat: getVideos(),
  }

  res.send(JSON.stringify(data));
});

app.post('/admin/api/ban', function(req, res) {
  if ( admin ) bans.push ( req.body.banname )
  res.send();
});

export default app
