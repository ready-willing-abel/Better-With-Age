import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-grid-system'
import SingleCheese from './SingleCheeseThumbnail'
import store, { GetCheeses } from '../store/cheeses.js'
import { GetPurchasesAll, GetUnorderedPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'


class AllCheese extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadCheeses()
    }

    render() {
        return (
            // more descriptive classNames
            <div className="container">
                <h1 className="cursive">Cheeses</h1>
                <div className="row">
                    {this.props.cheeses.map(cheese => {
                        return (
                            <div className=" col-sm-4 cursive" key={cheese.id}>
                                <SingleCheese
                                    indCheese={ cheese } />
                                    {/* pass prop down */}
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )

    }

}

function mapStateToProps(storeState) {
    return {
        cheeses: storeState.cheeses,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCheeses: () => {
            dispatch(GetCheeses())
            dispatch(GetUnorderedPurchasesUser(2))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCheese)
