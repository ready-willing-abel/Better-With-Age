import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { GetCheeses } from '../store/cheeses.js'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'
import { NavLink } from 'react-router-dom'
import { fetchReviews, postReview } from '../store/reviews'
import { GetUsers } from '../store/users'
import Rating from 'react-rating'


class SingleCheese extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.loadCheeses();
        this.props.loadCart((this.props.user.id) ? this.props.user.id : 'UNAUTH')
        this.props.loadReviews();
        this.props.loadUsers();
    }

    render() {
        let currentCheese = this.props.cheeses.find(cheese => cheese.id == this.props.match.params.id)

        let foundReviews = this.props.reviews.filter(review => review.cheeseId === currentCheese.id)

    
        return (
            <div className="container singleCheese">
                <center>
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
                    </center>

                    <br></br>

                    <header className = "subtitle">Description</header> 
                    <p>{this.props.cheeses && currentCheese.description}</p>


    
                    <div className="subtitle">
                        Leave A Review: 
                    </div>
                    
                    <form onSubmit={this.props.handleSubmit}>
                        <label>
                            <textarea name="newReview" value={this.value} rows="4" cols="50"/>
                        </label>
                        <button type="submit" className="btn btn-default btn-sm">Submit</button>
                    </form>

                    {/*Creating the Reviews section*/}
                    <div className="subtitle">
                       Customer Reviews
                    </div>
                    <br></br>
                    {foundReviews.map(review => 
                        <div className="reviews" key={review.id}>
                            <div className="name reviews">
                                <i className="material-icons md-36">account_circle</i>
                                {review.user.name}
                            </div>
                            <div>
                                {review.review}
                            </div>
                            <div>
                            <
                            Rating initialRating = {review.rating}
                            readonly /
                            >
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
        reviews: storeState.reviews,
        userName: storeState.user.name
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        loadCart: (id) => {
            dispatch(GetUnorderedPurchasesUser(id))
        },
        loadCheeses: () => {
            dispatch(GetCheeses())
        },
        deltQuantity: (id, value) => {
            dispatch(UpdatePurchase(id, {
                quantity: value
            }))
        },
        buySome: (id, cart, cheese) => {
            let cheeseInCart = cart.filter(v => v.cheese.name === cheese.name)[0] || null
            if (cheeseInCart) {
                dispatch(UpdatePurchase(cheeseInCart.id, {
                    quantity: parseInt(cheeseInCart.quantity) + 1
                }))
            } else {
                if (id !== 'UNAUTH') dispatch(AddPurchase({
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
        },
        loadUsers: () => {
            dispatch(GetUsers())
        },
        loadReviews: () => {
            dispatch(fetchReviews())
        }
        // handleSubmit (e) {
		// 	e.preventDefault();
        //     const newReview = e.target.newReview.value;
        //     console.log("these are ownprops", ownProps)
        //     dispatch(postReview({review:newReview, cheeseId:ownProps.match.params.id,
        //     userId:ownProps.user.id}));
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCheese)
