import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory, Link } from 'react-router'
import { createUser } from 'api/users'
import {cyan500} from 'material-ui/styles/colors'

import 'assets/styles/login.scss'

export default React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },
  handleChange: function (e) {
    var id = e.target.id
    var val = e.target.value
    var obj = {}
    obj[id] = val
    this.setState(obj)
  },
  handleSubmit: function(e) {
    e.preventDefault()
    createUser(this.state.username, this.state.password)
  },
  render: function () {
    return (
      <div className="loginForm">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Register</legend>
            <TextField onChange={this.handleChange} id="username" value={this.state.username} hintText="Username" floatingLabelText="Username" /><br />
            <TextField onChange={this.handleChange} type="password" value={this.state.password} id="password" hintText="Password" floatingLabelText="Password" /><br />
            <br />
            <RaisedButton secondary={true} type="submit" label="Register" />
          </fieldset>
        </form>
      </div>
    )
  }
})  
