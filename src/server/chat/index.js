export default function (io) {
  io.on('connection', function (socket) {
    socket.on('new message', function (msg) {
      io.emit('new message', msg)
    })
  })
}
