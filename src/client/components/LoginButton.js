import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default React.createClass({
  render: function () {
    return (
      <RaisedButton style={{marginTop: 5}} label='Login' {...this.props} />
    )
  }
})
