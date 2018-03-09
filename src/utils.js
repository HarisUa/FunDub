export function getNumberOfUsersInRoom(io, room) {
  const { length = 0 } = io.sockets.adapter.rooms[room] || {}
  return length
}
