import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory, Link } from 'react-router'
import { red500 } from 'material-ui/styles/colors'
import { login } from 'api/users'

import 'assets/styles/login.scss'

export default React.createClass({
  getInitialState: function() {
    return {
      errorMsg:'',
      username:'',
      password:''
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
    login(this.state.username, this.state.password).catch(err => {
      this.setState({
        errorMsg: 'Invalid username or password'
      })
    })
  },
  render: function () {
    return (
      <div className="loginForm">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Login</legend>
            <TextField onChange={this.handleChange} id="username" hintText="Username" floatingLabelText="Username" /><br />
            <TextField onChange={this.handleChange} type="password" id="password" hintText="Password" floatingLabelText="Password" /><br />
            <br />
            <span style={{color:red500}}>{this.state.errorMsg}</span>
            <RaisedButton primary={true} type="submit" label="Login" />
            <Link to="/register" style={{float:'right'}}><RaisedButton secondary={true} label="Register" /></Link>
          </fieldset>
        </form>
      </div>
    )
  }
})  
