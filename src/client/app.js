import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Router, Route, browserHistory } from 'react-router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import 'normalize.scss/normalize.scss'
import 'font-awesome/scss/font-awesome.scss'
import 'assets/styles/style.scss'

import Chat from 'components/Chat'
import Login from 'components/Login'
import Register from 'components/Register'

ReactDOM.render((
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={Login} />
      <Route path="/chat" component={Chat} />
      <Route path="/register" component={Register} />
    </Router>
  </MuiThemeProvider>
), document.getElementById('app'))
