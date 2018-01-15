import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import store, { GetCheeses } from '../store/cheeses.js'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'


class SingleCheese extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount(){
        this.props.loadCheeses();
    }

    render() {

        let currentCheese = this.props.cheeses.find(cheese => cheese.id == this.props.match.params.id)

        return (
            <div className="container col-sm-4 cursiveFont">
        
                
                <img className="thumbnail" src={this.props.cheeses && currentCheese.imageUrl} />
                
                <div>
                <h2>{this.props.cheeses && currentCheese.name}</h2>
                <h3>${this.props.cheeses && currentCheese.price}</h3>
                <RaisedButton label="Buy some"/>
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
        loadCheeses: () => {
            dispatch(GetCheeses())
        },
        deltQuantity: (id, value) => {
            console.log({ quantity: value })
            dispatch(UpdatePurchase(id, { quantity: value }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCheese)
