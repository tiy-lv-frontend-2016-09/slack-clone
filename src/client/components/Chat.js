import React from 'react'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import LoginButton from 'components/LoginButton'
import LoginMenu from 'components/LoginMenu'
import store from 'store'
import { addMessage } from 'api/messages'

const ChatContainer = React.createClass({
  getInitialState: function () {
    return {
      logged: false,
      messages: []
    }
  },
  componentWillMount: function () {
    this.unsubscribe = store.subscribe(() => {
      const appState = store.getState()
      this.setState({
        logged: appState.logged,
        messages: appState.messages
      })
    })
  },
  componentWillUnmount: function () {
    this.unsubscribe()
  },
  render: function () {
    return (
      <Chat {...this.state} />
    )
  }
})

const Chat = React.createClass({
  getDefaultProps: function () {
    return {
      messages: []
    }
  },
  getInitialState: function () {
    return {
      userInput: ''
    }
  },
  handleChange: function (e) {
    this.setState({
      userInput: e.target.value
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
  },
  render: function () {
    return (
      <div id='container'>
        <AppBar
          style={{zIndex: 11000}}
          showMenuIconButton={false}
          iconElementRight={this.props.logged ? <LoginMenu /> : <LoginButton />}
        />
        <Drawer open />
        <div id='content'>
          <ul>
            {this.props.messages.map((msg,i) => (
              <li key={'message-' + i}>
                {msg.message}
              </li>
            ))}
          </ul>
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
