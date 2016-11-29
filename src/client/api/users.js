import axios from 'axios'
import store from 'store'
import { browserHistory } from 'react-router'
import api from 'lib/api'

api.new('/api')

export function createUser(username, password) {
  return api.post('/register', {username:username, password:password}).then(function(resp){
    browserHistory.push('/')
  })
}

export function login(username, password) {
  return api.login(username, password, function success() {
    console.log('in login method - no error')
    browserHistory.push('/chat')
  })
}
