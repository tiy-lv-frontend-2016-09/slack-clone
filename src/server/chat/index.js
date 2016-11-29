export default function (io) {
  var users = []
  var channels = [
    {
      'name': 'foo',
      'users': [],
      'messages': []
    },
    {
      'name': 'bar',
      'users': [],
      'messages': []
    },
    {
      'name': 'baz',
      'users': [],
      'messages': []
    }
  ]

  io.on('connection', function (socket) {
    socket.on('join', function(obj) {
      console.log('obj', obj)

      var channel = channels.filter(channel => {
        return obj.channel === channel.name
      })[0]

      console.log('channel', channel)

      channel.users.push({
        username:obj.username,
        id:socket.id
      })

      socket.join(channel.name)

      io.to(channel.name).emit('users', channel.users)
      io.to(channel.name).emit('initial messages', channel.messages)
    })

    socket.on('new message', function (msg) {
      var channel = channels.filter(channel => {
        return msg.channel === channel.name
      })[0]

      channel.messages.push(msg)

      channel.messages = channel.messages.slice(-50)

      io.to(msg.channel).emit('new message', msg)
    })

    socket.on('typing', function(typing){
      io.to(typing.channel).emit('typing', typing.typing)
    })

    socket.on('disconnect', function() {
      channels.forEach(channel => {
        channel.users = channel.users.filter(user=>{
          return socket.id !== user.id
        })
        io.to(channel.name).emit('users', channel.users)
      })
    })
  })
}
