import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'
import store, {GetCheeses} from '../store/cheeses.js'
import {
    GetPurchasesAll,
    GetUnorderedPurchasesUser,
    GetOldPurchasesUser,
    UpdatePurchase,
    AddPurchase,
    DeletePurchase
} from '../store/purchases'
import {NavLink} from 'react-router-dom'
import Rating from 'react-rating'

class CheeseThumbnail extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadCart((this.props.user.id) ? this.props.user.id : 'UNAUTH')
    }

    render() {
        return (
            <div className = "thumbnail" >
            <div className = "title" >
            <NavLink to = {`/cheeses/${this.props.indCheese.id}`}>
                {this.props.indCheese && this.props.indCheese.name}
            </NavLink>
            <br/>
            </div>
            <img src = {
                this.props.indCheese && this.props.indCheese.imageUrl
            }/><br/>
            <div>
            <NavLink to = "/cart" >
            <button type = "button"
            className = "btn btn-default btn-lg"
            onClick = {
                () => {
                    this.props.buySome((this.props.user.id) ? this.props.user.id : false, this.props.unpurchasedOrders, this.props.indCheese)
                }
            } >

            <span className = "glyphicon glyphicon-shopping-cart" >
            </span> Add to Cart </button >
            </NavLink > < br/>
            <div> $ {
                this.props.indCheese.price
            } </div> <div>
            <Rating initialRating = {
                (this.props.indCheese.totalReviews) ? this.props.indCheese.totalRatingSum / this.props.indCheese.totalReviews : 0
            }

            readonly/>
            </div> </div> </div>
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
        buySome: (id, cart, cheese) => {
            let cheeseInCart = cart.filter(v => v.cheese.name === cheese.name)[0] || null
            if (cheeseInCart) {
                dispatch(UpdatePurchase(cheeseInCart.id, {
                    quantity: parseInt(cheeseInCart.quantity) + 1
                }))
            } else {
                if (id) dispatch(AddPurchase({
                    quantity: 1,
                    cheeseId: cheese.id,
                    userId: id,
                    price: cheese.price
                }))
                else dispatch(AddPurchase({
                    quantity: 1,
                    cheeseId: cheese.id,
                    price: cheese.price
                }))
            }

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheeseThumbnail)
