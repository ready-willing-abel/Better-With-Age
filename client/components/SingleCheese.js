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
        this.props.loadCart((this.props.user.id) ? this.props.user.id : 'UNAUTH')

    }

    render() {

        let currentCheese = this.props.cheeses.find(cheese => cheese.id == this.props.match.params.id)

        console.log('THESE ARE PROPS', this.props)
        console.log('THESE ARE the cheese id', cheeses.id)
        console.log('THESE ARE PROPS', this.props)

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
                                    this.props.buySome((this.props.user.id) ? this.props.user.id : 'UNAUTH',this.props.unpurchasedOrders, currentCheese)
                                    }}
                                >
                                <span className="glyphicon glyphicon-shopping-cart"></span> Add to Cart
                            </button>
                        </NavLink>
                    </div>

                    <div className="subtitle">
                        Reviews:
                        {this.props.cheese && currentCheese.reviews.forEach(review => <div> review </div> )}
                    </div>

                    <ul>
                        <li> {this.props.cheese && currentCheese.reviews }</li>
                    </ul>
                    


            </div>
        )
    }
}

function mapStateToProps(storeState) {
    return {
        cheeses: storeState.cheeses,
        unpurchasedOrders: storeState.purchases,
        user:storeState.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCart: (id) => {
            dispatch(GetUnorderedPurchasesUser(id))
        },
        loadCheeses: () => {
            dispatch(GetCheeses())
        },
        deltQuantity: (id, value) => {
            dispatch(UpdatePurchase(id, { quantity: value }))
        },
        buySome: (id,cart,cheese) => {
            let cheeseInCart = cart.filter(v => v.cheese.name === cheese.name)[0] || null
            if (cheeseInCart){
                dispatch(UpdatePurchase(cheeseInCart.id, { quantity: parseInt(cheeseInCart.quantity) + 1 }))
            }
            else{
                if (id!=='UNAUTH') dispatch(AddPurchase({ quantity: 1, cheeseId: cheese.id, userId: id, price: cheese.price }))
                else dispatch(AddPurchase({ quantity: 1, cheeseId: cheese.id, price: cheese.price }))
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCheese)
