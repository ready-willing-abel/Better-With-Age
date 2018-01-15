import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import store, { GetCheeses } from '../store/cheeses.js'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'
import { NavLink } from 'react-router-dom'


class SingleCheese extends Component {

    constructor(props) {
        super(props)
      
    }

    componentWillMount(){
        this.props.loadCheeses();
        this.props.loadCart(2)
      
    }

    render() {

        let currentCheese = this.props.cheeses.find(cheese => cheese.id == this.props.match.params.id)

        return (
            <div className="container singleCheese">
        
                <img src={this.props.cheeses && currentCheese.imageUrl} />
                
               
                    <div className="title">{this.props.cheeses && currentCheese.name}</div>
                    <div className="title">${this.props.cheeses && currentCheese.price}</div>
                    <p> Description: {this.props.cheeses && currentCheese.description}</p>
                  
                  
                    <div>
                        <NavLink to="/cart">
                            <button type="button" className="btn btn-default btn-lg" 
                                onClick={() => {
                                    this.props.buySome(this.props.unpurchasedOrders, currentCheese)
                                    }}
                            >
                                <span className="glyphicon glyphicon-shopping-cart"></span> Add to Cart
                            </button>
                        </NavLink> 
                    </div>
                
                    
            </div>
        )
    }
}

function mapStateToProps(storeState) {
    return {
        cheeses: storeState.cheeses,
        unpurchasedOrders: storeState.purchases
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCart: () => {
            dispatch(GetUnorderedPurchasesUser(2))
        },
        loadCheeses: () => {
            dispatch(GetCheeses())
        },
        deltQuantity: (id, value) => {
            dispatch(UpdatePurchase(id, { quantity: value }))
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleCheese)
