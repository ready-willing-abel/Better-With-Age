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

const mapState = (state) => {
  return {
    purchasesHistory: state.purchases.defaultPurchases
  }
}

const groupPurchases = (purchases) => {
  let orders = {}
  purchases.forEach(purchase => {
    let timestamp = purchase.createdAt.slice(0, 19);
    if (orders[timestamp].length) {orders[timestamp].push(purchase)}
    else {orders[timestamp] = [purchase]}
  })
  return orders
}


class UserPage extends Component {
  componentDidMount () {
    const ordersThunk = GetOldPurchasesUser(1) //TODO: hook up to userId
    store.dispatch(ordersThunk);
  }

  render () {
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
            <OrdersTable orders={'placeholder'} /> {/* groupPurchases(this.props.purchasesHistory) */}
          </CardText>
        </Card>
      </Paper>
    )
  }
}

export default connect(mapState)(UserPage)
