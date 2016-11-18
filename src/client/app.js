import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import 'normalize.scss/normalize.scss'
import 'font-awesome/scss/font-awesome.scss'
import 'assets/styles/style.scss'

import Chat from 'components/chat'

ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Chat />
  </MuiThemeProvider>
), document.getElementById('app'))
