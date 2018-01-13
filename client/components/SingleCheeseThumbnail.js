import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import store, { GetCheeses } from '../store/cheeses.js'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'


class CheeseThumbnail extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div >
                <h4>{this.props.indCheese && this.props.indCheese.cheese.name}</h4>
                <h4>${this.props.indCheese && this.props.indCheese.cheese.price}</h4>
                <img style={{ width: 200, height: 150 }} src={this.props.indCheese && this.props.indCheese.cheese.imageUrl} />
                <div><RaisedButton
                    label="Buy some"
                    onClick={() => this.props.deltQuantity(this.props.indCheese.cheese.id, 666)}
                />
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
        deltQuantity: (id, value) => {
            console.log({ quantity: value })
            dispatch(UpdatePurchase(id, { quantity: value }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheeseThumbnail)