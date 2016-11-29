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

socket.on('initial messages', function(messages){
  store.dispatch({
    type: actions.INITIAL_MESSAGES,
    messages: messages
  })
})

export function joinChat(channel) {
  socket.emit('join', {username: Cookies.get('username'), channel:channel})
}

export function addMessage (msg) {
  msg.timestamp = moment().format().toString()
  msg.username = Cookies.get('username')
  msg.channel = 'foo'
  socket.emit('new message', msg)
}

export function isTyping(typing) {
  typing = {
    typing: typing,
    channel: 'foo'
  }
  socket.emit('typing', typing)
}
