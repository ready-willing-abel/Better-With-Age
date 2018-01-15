import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import store, { GetCheeses } from '../store/cheeses.js'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'


class SingleCheese extends Component {

    // consistent spacing: 2 vs 4, CG: Webstorm

    constructor(props) {
        super(props)
    }

    render() {

        let theCheese = parseInt(this.props.match.params.id)
        let currentCheese = this.props.cheeses.find(cheese => cheese.id === theCheese)

        return (
            <div className="container col-6 cursive">
        
                {/* no inline styles! better for others; also only pick height or width, not both */}
                <img style={{ width: 400, height: 275 }} src={this.props.cheeses && currentCheese.imageUrl} />
                
                <div>
                <h2>{this.props.cheeses && currentCheese.name}</h2>
                <h3>${this.props.cheeses && currentCheese.price}</h3>
                {/* use classNames for styling, vs tags */}
                <RaisedButton
                    label="Buy some"
                />
                </div>
                
                
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