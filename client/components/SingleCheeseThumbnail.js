import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import store, { GetCheeses } from '../store/cheeses.js'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'
import { NavLink } from 'react-router-dom'

class CheeseThumbnail extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.loadCart((this.props.user.id) ? this.props.user.id: 'UNAUTH')
    }

    render() {
        return (
            <div >
                <h4><NavLink to={`/cheeses/${this.props.indCheese.id}`}>{this.props.indCheese && this.props.indCheese.name}</NavLink></h4>
                <h4>${this.props.indCheese && this.props.indCheese.price}</h4>
                <img style={{ width: 200, height: 150 }} src={this.props.indCheese && this.props.indCheese.imageUrl} />
                <div><RaisedButton
                    label="Buy some"
                    onClick={() => this.props.buySome((this.props.user.id) ? this.props.user.id:false,this.props.unpurchasedOrders, this.props.indCheese)}
                />
                </div>
            </div>
        )
    }
}

function mapStateToProps(storeState) {
    return {
        unpurchasedOrders: storeState.purchases,
        user: storeState.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCart: (userId) => {
            dispatch(GetUnorderedPurchasesUser(userId))
        },
        buySome: (id,cart,cheese) => {
            let cheeseInCart = cart.filter(v => v.cheese.name === cheese.name)[0] || null
            console.log('inside thunk dispatcher', id)
            if (cheeseInCart){
                dispatch(UpdatePurchase(cheeseInCart.id, { quantity: parseInt(cheeseInCart.quantity) + 1 }))
            }
            else{
                if(id) dispatch(AddPurchase({ quantity: 1, cheeseId: cheese.id, userId: id, price: cheese.price }))
                else dispatch(AddPurchase({ quantity: 1, cheeseId: cheese.id, price: cheese.price }))
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheeseThumbnail)
