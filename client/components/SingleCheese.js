import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import store, { GetCheeses } from '../store/cheeses.js'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'
import { NavLink } from 'react-router-dom'
import { fetchReviews } from '../store/reviews'
import { GetUsers } from '../store/users'


class SingleCheese extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount(){
        this.props.loadCheeses();
        this.props.loadCart((this.props.user.id) ? this.props.user.id : 'UNAUTH')
        this.props.loadReviews();
        this.props.loadUsers();
    }

    render() {
        let currentCheese = this.props.cheeses.find(cheese => cheese.id == this.props.match.params.id)

        let foundReviews = this.props.reviews.filter(review => review.cheeseId === currentCheese.id)
        // console.log("These are the reviews", foundReviews)

        // let foundMembers= foundReviews.map(review => review.userId === member.id)
        // console.log("These are the members", foundMembers)

        // console.log("THESE ARE MEMBERS", foundMembers)

        

        return (
            <div className="container singleCheese">

                <img src={this.props.cheeses && currentCheese.imageUrl} />

                    <div className="title">{this.props.cheeses && currentCheese.name}</div>
                    <div className="title">${this.props.cheeses && currentCheese.price}</div>
                    

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

                    <header className = "subtitle">Description</header> 
                    <p>{this.props.cheeses && currentCheese.description}</p>

                    {/*Creating the Reviews section*/}
                    <div className="subtitle">
                       Customer Reviews
                    </div>
                    
                    {foundReviews.map(review => 
                        <div key={review.id}>
                            <div className="name">
                                <i className="material-icons">account_circle</i>
                                {review.user.name}
                            </div>
                            <div>
                                {review.review}
                            </div>
                        </div>
                    )}

            </div>
        )
    }
}

function mapStateToProps(storeState) {
    return {
        cheeses: storeState.cheeses,
        unpurchasedOrders: storeState.purchases,
        user: storeState.user,
        reviews: storeState.reviews
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
            else {
                if (id!=='UNAUTH') dispatch(AddPurchase({ quantity: 1, cheeseId: cheese.id, userId: id, price: cheese.price }))
                else dispatch(AddPurchase({ quantity: 1, cheeseId: cheese.id, price: cheese.price }))
            }
        },
        loadUsers: () => {
            dispatch(GetUsers())
        },
        loadReviews: () => {
            dispatch(fetchReviews())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCheese)
