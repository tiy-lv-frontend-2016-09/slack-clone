export default function (io) {
  var users = []
  io.on('connection', function (socket) {
    socket.on('join', function(username) {
      users.push({
        username:username,
        id:socket.id
      })

      io.emit('users', users)
    })

    socket.on('new message', function (msg) {
      io.emit('new message', msg)
    })

    socket.on('typing', function(isTyping){
      io.emit('typing', isTyping)
    })

    socket.on('disconnect', function() {
      users = users.filter(user=>{
        return socket.id !== user.id
      })
      io.emit('users', users)
    })
  })
}
