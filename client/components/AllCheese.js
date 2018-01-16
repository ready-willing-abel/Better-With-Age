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
        this.props.loadCheeses(this.props.user.id)
    }

    render() {
        return (
            <div className="container">
                <div className="title">Cheeses</div>

                <div className="row">
                    {this.props.cheeses.map(cheese => {
                        return (
                          <div className="col-sm-4" key= { cheese.id }>
                            <SingleCheese indCheese={ cheese } />
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
        user: storeState.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCheeses: (id) => {
            dispatch(GetCheeses())
            if(id) dispatch(GetUnorderedPurchasesUser(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCheese)
