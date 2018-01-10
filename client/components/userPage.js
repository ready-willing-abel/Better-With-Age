import React, {Component} from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper';

const style = {
  padding: 20
}

export const UserPage = () => {
  return (
    <Paper zDepth={3} style={style}>
      <h1> User Page </h1>
    </Paper>
  )
}
