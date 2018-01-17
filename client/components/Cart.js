import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'
import store from '../store'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { GetCheeses } from '../store/cheeses.js';
import FlatButton from 'material-ui/FlatButton';


class Cart extends Component {
  constructor(props) {
    super(props)
    this.state={
      open:false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handlePurchase = this.handlePurchase.bind(this)
  }

  componentWillMount(){
    this.props.loadCart((this.props.user.id) ? this.props.user.id: 'UNAUTH')
    this.props.loadCheeses();
  }

  handleClose(){
    this.setState({ open: false })
  }

  handlePurchase(){
    this.props.purchaseCart(this.props.unpurchasedOrders)
    this.props.history.push(`/user/`)
    this.setState({ open: false })
  }

  render(){

    let actions = [
      <FlatButton
        label="Purchase"
        primary={true}
        onClick={this.handlePurchase}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />]

    const cartTotal = this.props.unpurchasedOrders.reduce((a,b)=>{
      return a + (b.cheese.price * b.quantity)
    },0)
    if(this.props.unpurchasedOrders) return (
      <div className="cartTableContainer">
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Cheese</TableHeaderColumn>
              <TableHeaderColumn>Quantity</TableHeaderColumn>
              <TableHeaderColumn>In Stock</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Total</TableHeaderColumn>
              <TableHeaderColumn>Add</TableHeaderColumn>
              <TableHeaderColumn>Remove</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {
            this.props.unpurchasedOrders.map(cartItem=>{
              return (
                <TableRow>
                  <TableRowColumn>{cartItem.cheese.name}</TableRowColumn>
                  <TableRowColumn>{cartItem.quantity}</TableRowColumn>
                  <TableRowColumn>{cartItem.cheese.quantity}</TableRowColumn>
                  <TableRowColumn>{'$'+cartItem.cheese.price}</TableRowColumn>
                  <TableRowColumn>{'$' + (cartItem.cheese.price * cartItem.quantity)}</TableRowColumn>
                  <TableRowColumn>
                    <FloatingActionButton
                      backgroundColor={"#FDD835"}
                      disabled={cartItem.cheese.quantity<=cartItem.quantity}
                      mini={true}
                      onClick={() => this.props.deltQuantity(cartItem.id, cartItem.quantity + 1)}>
                      <ContentAdd />
                    </FloatingActionButton>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FloatingActionButton
                      backgroundColor={"#BF360C"}
                      mini={true}
                      onClick={() => this.props.deltQuantity(cartItem.id, cartItem.quantity - 1)}>
                      <ContentRemove />
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>
              )
            })
          }
          </TableBody>
        </Table>
        <RaisedButton
        onClick={()=>{
          this.setState({open:true})
        }}
        label={(this.props.unpurchasedOrders.length<1)?`Your Cart is Empty`:`Purchase Cart $${cartTotal}`}
        fullWidth={true}
        disabled={this.props.unpurchasedOrders.length<1}/>
        <Dialog
          title="Thank you for shopping!"
          actions={actions}
          modal={true}
          open={this.state.open}>
          If you are not sure you are happy with your cart, hit cancel to continue reviewing
        </Dialog>
      </div>
    )
    else return (<div></div>)
  }
}


function mapStateToProps(storeState) {
  return {
    unpurchasedOrders: storeState.purchases.reduce((a,b)=>{
      if(!a.map(v=>v.id).includes(b.id)) a.push(b)
      return a
    },[]),
    user: storeState.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCheeses:()=>{
      dispatch(GetCheeses())
    },
    loadCart: (userId)=>{
      dispatch(GetUnorderedPurchasesUser(userId))
    },
    deltQuantity: (id,value)=>{
      if(value<1) dispatch(DeletePurchase(id))
      else dispatch(UpdatePurchase(id,{quantity: value}))
    },
    purchaseCart:(items)=>{
      items.forEach(item=>{
        dispatch(UpdatePurchase(
          item.id,
          {
            cheeseQ: item.cheese.quantity,
            cheeseId: item.cheeseId,
            priceAtTimeOfSale: item.price,
            ordered: true,
            orderStatus: "processing",
            quantity: item.quantity
          }
        ))
      })
    }
  }
}

const CartView = connect(mapStateToProps, mapDispatchToProps)(Cart)


export default CartView
