import React from 'react'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import store from 'store'
import { addMessage, isTyping, joinChat, leaveChat } from 'api/messages'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar'


const ChatContainer = React.createClass({
  getInitialState: function () {
    return {
      logged: false,
      messages: [],
      typing: false,
      users: []
    }
  },
  componentWillMount: function () {
    this.unsubscribe = store.subscribe(() => {
      this.updateMessages()
    })
    this.update = setInterval(()=>{
      this.updateMessages()
    }, 1000)
    joinChat()
  },
  updateMessages: function() {
    const appState = store.getState()
    this.setState({
      logged: appState.logged,
      messages: appState.messages.map(msg=>{
        return {
          username:msg.username,
          message:msg.message,
          timestamp:moment(msg.timestamp).fromNow()
        }
      }),
      typing: appState.typing,
      users: appState.users
    })
  },
  componentWillUnmount: function () {
    this.unsubscribe()
    clearInterval(this.update)
    leaveChat()
  },
  render: function () {
    return (
      <Chat {...this.state} />
    )
  }
})

const Chat = React.createClass({
  getInitialState: function () {
    return {
      userInput: ''
    }
  },
  handleChange: function (e) {
    var val = e.target.value

    if (val !== '') {
      isTyping(true)
    } else {
      isTyping(false)
    }

    this.setState({
      userInput: val
    })
  },
  handleSubmit: function (e) {
    e.preventDefault()
    addMessage({
      message: this.state.userInput
    })
    this.setState({
      userInput: ''
    })
    isTyping(false)
  },
  render: function () {
    return (
      <div id='container'>
        <Drawer open={true}>
          <List>
            <Subheader>Chat Users</Subheader>
            {this.props.users.map((user, i) => (
              <ListItem key={'user' + i}
                primaryText={user.username}
                leftAvatar={<Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>}
              />
            ))}
          </List>
        </Drawer>
        <div id='content'>
          <ul>
            {this.props.messages.map((msg,i) => (
              <li key={'message-' + i}>
                {msg.username}: {msg.message} <span style={{color:'#ccc'}}>{msg.timestamp}</span>
              </li>
            ))}
          </ul>
          {this.props.typing ? <span style={{color:'#ccc'}}>Someone is Typing</span> : ''}
          <div id='input'>
            <form onSubmit={this.handleSubmit}>
              <input autoComplete="off" onChange={this.handleChange} type='text' id='userInput' value={this.state.userInput} />
              <RaisedButton type='submit' label='Send' />
            </form>
          </div>
        </div>
      </div>
    )
  }
})

export default ChatContainer
