import io from 'socket.io-client'
import * as actions from 'actions'
import store from 'store'

const socket = io()

socket.on('new message', function (msg) {
  store.dispatch({
    type: actions.ADD_MESSAGE,
    message: msg
  })
})

export function addMessage (msg) {
  socket.emit('new message', msg)
}
