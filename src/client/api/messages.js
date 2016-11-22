import io from 'socket.io-client'
import * as actions from 'actions'
import store from 'store'
import moment from 'moment'
import Cookies from 'js-cookie'

const socket = io()

socket.on('new message', function (msg) {
  store.dispatch({
    type: actions.ADD_MESSAGE,
    message: msg
  })
})

socket.on('typing', function(isTyping){
  store.dispatch({
    type: actions.IS_TYPING,
    typing: isTyping
  })
})

socket.on('users', function(users){
  store.dispatch({
    type: actions.USER_LIST_UPDATE,
    users: users
  })
})

export function joinChat() {
  socket.emit('join', Cookies.get('username'))
}

export function addMessage (msg) {
  msg.timestamp = moment().format().toString()
  msg.username = Cookies.get('username')
  socket.emit('new message', msg)
}

export function isTyping(typing) {
  socket.emit('typing', typing)
}
