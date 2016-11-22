import axios from 'axios'
import store from 'store'
import {browserHistory} from 'react-router'


export function createUser(username, password) {
  return axios.post('/register', {username:username, password:password}).then(function(resp){
    browserHistory.push('/chat')
  })
}
