import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { OrdersTable } from '../user-page/ordersTable'
import UserTable from './UserTable'
import { GetOldPurchasesUser, GetPurchasesAll } from '../../store/purchases'
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
      let timestamp = purchase.createdAt.slice(0, 16);
      if (orders[timestamp]) { orders[timestamp].push(purchase) }
      else { orders[timestamp] = [purchase] }
    })
  }
  return orders
}

class AdminPage extends Component {

  constructor(){
    super()
    this.state = {
      personalOrderHistory: false
    }
  }

  render() {
    const orders = groupPurchases(this.props.purchasesHistory)
    if(this.props.user.isAdmin) return (
      <Paper zDepth={3} style={parentStyle}>
        <h1> Welcome, {this.props.user.name} </h1>
        <Paper zDepth={1} style={personalStyle}>
          <h4>Email: {this.props.user.email}</h4>
          <h4>Address: </h4>
          <RaisedButton label="Change Password" />
        </Paper>
        <Card>
          <CardHeader
            title={(this.state.personalOrderHistory)?"My Order History":"Order Traffic"}
            showExpandableButton={true}
          />
          <RaisedButton
            label={(this.state.personalOrderHistory) ? "See Order Traffic" : "See My Order History"}
            onClick={()=>{
              this.setState({ personalOrderHistory: !this.state.personalOrderHistory })
              setTimeout(()=>{
                if (this.state.personalOrderHistory) this.props.getMyOrders(this.props.user.id)
                else this.props.getAllOrders()
              }, 30);
            }
          }
          />
          <CardText expandable={true} >
            <h3>Purchases</h3>
            <OrdersTable orders={orders} /> {/* groupPurchases(this.props.purchasesHistory) */}
          </CardText>
        </Card>
        <Card>
          <CardHeader
            title="Manage Members"
            showExpandableButton={true}
          />
          <CardText expandable={true} >
            <h3>Users</h3>
            <UserTable/>
          </CardText>
        </Card>
      </Paper>
    )
    else return (<img src="https://cdn.meme.am/cache/instances/folder419/500x/72679419/no-tp-access-denied-to-you.jpg" />)
  }
}

const mapState = (state) => {
  return {
    purchasesHistory: state.purchases,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMyOrders:(id)=>{
      dispatch(GetOldPurchasesUser(id));
    },
    getAllOrders:()=>{
      dispatch(GetPurchasesAll());
    }
  }
}

export default connect(mapState, mapDispatchToProps)(AdminPage)
