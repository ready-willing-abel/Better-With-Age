import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import store, { GetCheeses } from '../store/cheeses.js'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'


class SingleCheese extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let theCheese = parseInt(this.props.match.params.id) + 1

        return (
            <div>
                <div>THIS IS SINGLE CHEESE </div>
                <img style={{ width: 200, height: 150 }} src={this.props.cheeses && this.props.cheeses[theCheese].imageUrl} />
                <h4>{this.props.cheeses && this.props.cheeses[theCheese].name}</h4>
                <h4>${this.props.cheeses && this.props.cheeses[theCheese].price}</h4>
            </div>
        )
    }
}

function mapStateToProps(storeState) {
    return {
        cheeses: storeState.cheeses
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleCheese)


{/* <div >
<img style={{ width: 200, height: 150 }} src={this.props.indCheese && this.props.indCheese.cheese.imageUrl} />
<h4>{this.props.indCheese && this.props.indCheese.cheese.name}</h4>
<h4>${this.props.indCheese && this.props.indCheese.cheese.price}</h4>
<div><RaisedButton
    label="Buy some"
    onClick={() => this.props.deltQuantity(this.props.indCheese.cheese.id, 666)}
/>
</div>
</div> */}