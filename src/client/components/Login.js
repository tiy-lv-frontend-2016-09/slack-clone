import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory, Link } from 'react-router'

import 'assets/styles/login.scss'

export default React.createClass({
  handleSubmit: function(e) {
    e.preventDefault()
    browserHistory.push('/chat')
  },
  render: function () {
    return (
      <div className="loginForm">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Login</legend>
            <TextField id="username" hintText="Username" floatingLabelText="Username" /><br />
            <TextField type="password" id="password" hintText="Password" floatingLabelText="Password" /><br />
            <br />
            <RaisedButton type="submit" label="Login" />
            <Link to="/register"><RaisedButton label="Register" /></Link>
          </fieldset>
        </form>
      </div>
    )
  }
})  
