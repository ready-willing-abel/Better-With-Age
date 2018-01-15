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

    // componentDidMount(){
    //     this.props.loadCart(2)
    // }

    render() {
        return (
            <div className="thumbnail">

                <div className="title">
                    <NavLink to={`/cheeses/${this.props.indCheese.id}`}>{this.props.indCheese && this.props.indCheese.name}</NavLink>
                </div>
                
               
                <img src={this.props.indCheese && this.props.indCheese.imageUrl} />
                <div> 
                    <NavLink to="/cart"><RaisedButton
                        label="Buy some"
                        onClick={() => {
                            this.props.buySome(this.props.unpurchasedOrders, this.props.indCheese)
                            }
                        }
                    />
                    </NavLink>
                </div>
            </div>
        )
    }
}

function mapStateToProps(storeState) {
    return {
        unpurchasedOrders: storeState.purchases
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCart: (userId) => {
            dispatch(GetUnorderedPurchasesUser(userId))
        },
        buySome: (cart,cheese) => {
            let cheeseInCart = cart.filter(v => v.cheese.name === cheese.name)[0] || null

            if (cheeseInCart){
                dispatch(UpdatePurchase(cheeseInCart.id, { quantity: parseInt(cheeseInCart.quantity) + 1 }))
            }
            else{
                dispatch(AddPurchase({ quantity: 1, cheeseId: cheese.id, userId: 2, price: cheese.price }))
            }

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheeseThumbnail)
