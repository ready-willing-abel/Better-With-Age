import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'
import store from '../store'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

let dispatch = store.dispatch
const styleA = {
  display: "flex"
}
const styleB = {
  flex: 1
}
const styleC = {
  transform: `translate(10px, 50px)`,
  flex: .5,
}
const styleD = {
  margin: 12
}
const styleE = {
  transform: `translate(15px, 0px)`
}


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
      <div className="cartTableContainer" style={styleA}>
        <div className="tableContainer-cart" style={styleB}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Cheese</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {
              this.props.unpurchasedOrders.map(cartItem=>{
                return (
                  <TableRow>
                    <TableRowColumn>{cartItem.cheese.name}</TableRowColumn>
                    <TableRowColumn>{cartItem.quantity}</TableRowColumn>
                    <TableRowColumn>{'$'+cartItem.cheese.price}</TableRowColumn>
                  </TableRow>
                )
              })
            }
            </TableBody>
          </Table>
        </div>
        <div className="cartTableButtonsContainer" style={styleC}>
          {
            this.props.unpurchasedOrders.map(cartItem => {
              return (
                <div className="cartTableButtons" style={styleD}>
                  <FloatingActionButton mini={true} onClick={() => this.props.deltQuantity(cartItem.id, cartItem.quantity + 1)}>
                  </FloatingActionButton>
                  <FloatingActionButton secondary={true} mini={true} onClick={() => this.props.deltQuantity(cartItem.id, cartItem.quantity - 1)} style={styleE}>
                  </FloatingActionButton>
                </div>
              )
            })
          }
        </div>
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
      if(value<1) dispatch(DeletePurchase(id))
      else dispatch(UpdatePurchase(id,{quantity: value}))
    }
  }
}

const CartView = connect(mapStateToProps, mapDispatchToProps)(Cart)


export default CartView
