import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'
import { List, ListItem } from 'material-ui/List';
import store from '../store'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

let dispatch = store.dispatch

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.loadCart(2)
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
                <div>
                <ListItem
                  primaryText={cartItem.cheese.name + '\t' + cartItem.quantity}
                  rightIcon={
                    <FloatingActionButton mini={true} onClick={()=>this.props.deltQuantity(cartItem.id,cartItem.quantity + 1)}>
                      <ContentAdd />
                    </FloatingActionButton>}
                />
                </div>
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
    },
    deltQuantity: (id,value)=>{
      dispatch(UpdatePurchase(id,{quantity: value}))
    }
  }
}

const CartView = connect(mapStateToProps, mapDispatchToProps)(Cart)


export default CartView
