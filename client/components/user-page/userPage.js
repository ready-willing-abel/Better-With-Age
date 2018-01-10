import React, {Component} from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { OrdersTable } from './ordersTable'

const parentStyle = {
  padding: 20,
  maxWidth: 900,
  margin: 'auto'
}

const personalStyle = {
  padding: 20
}

export const UserPage = () => {
  return (
    <Paper zDepth={3} style={parentStyle}>
      <h1> User Page </h1>
      <Paper zDepth={1} style={personalStyle}>
        <h4>Email: </h4>
        <h4>Address: </h4>
        <RaisedButton label="Change Password" />
      </Paper>
      <Card>
        <CardHeader
        title="Order History"
        showExpandableButton={true}
      />
        <CardText expandable={true} >
          <h3>Placeholder</h3>
          <OrdersTable />
        </CardText>
      </Card>
    </Paper>
  )
}
