import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'
import { List, ListItem } from 'material-ui/List';
import store from '../store'

let dispatch = store.dispatch

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.loadCart(0)
  }

  render(){
    console.log(this.props)
    if(this.props.unpurchasedOrders) return (
      <div>
        <div>I have props</div>

        <List>
          {
            this.props.unpurchasedOrders.map(cartItem=>{
              return (
                <ListItem
                  primaryText={cartItem.cheese.name}
                />
              )
            })
          }
        </List>
      </div>
    )
    else return (<div>THIS IS ALSO A DIV</div>)
  }
}



function mapStateToProps(storeState) {
  return {
    unpurchasedOrders: storeState.purchases,
    // user: storeState.defaultUser // or session ID
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCart: (userId)=>{
      console.log('mounting')
      dispatch(GetUnorderedPurchasesUser(userId))
    }
  }
}

const CartView = connect(mapStateToProps, mapDispatchToProps)(Cart)


export default CartView
