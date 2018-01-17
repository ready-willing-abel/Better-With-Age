import React, {Component} from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { OrdersTable } from './ordersTable'
import { GetOldPurchasesUser } from '../../store/purchases'
import store from '../../store'

const parentStyle = {
  padding: 20,
  maxWidth: 900,
  margin: 'auto'
}

const personalStyle = {
  padding: 20
}

const groupPurchases = (purchases) => {
  let orders = {}
  if (purchases) {
    purchases.forEach(purchase => {
      let timestamp = purchase.createdAt.slice(0, 19);
      if (orders[timestamp]) {orders[timestamp].push(purchase)}
      else {orders[timestamp] = [purchase]}
    })
  }
  return orders
}

const mapState = (state) => {
  return {
    purchasesHistory: state.purchases,
    user: state.user
  }
}

class UserPage extends Component {

  componentDidMount () {
    const ordersThunk = GetOldPurchasesUser(this.props.user.id)
    store.dispatch(ordersThunk);
  }

  render () {
    if (this.props.user.isAdmin) this.props.history.push('/admin')
    const orders = groupPurchases(this.props.purchasesHistory)
    return (
      <Paper zDepth={3} style={parentStyle}>
        <h1> Welcome, {this.props.user.name} </h1>
        <Paper zDepth={1} style={personalStyle}>
          <h4>Email: {this.props.user.email}</h4>
          <h4>Address: </h4>
          <RaisedButton label="Change Password" />
        </Paper>
        <Card>
          <CardHeader
          title="Order History"
          showExpandableButton={true}
        />
          <CardText expandable={true} >
            <h3>Orders</h3>
            <OrdersTable orders={orders} />
          </CardText>
        </Card>
      </Paper>
    )
  }
}

export default connect(mapState)(UserPage)
