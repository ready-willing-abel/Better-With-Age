import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux'
import {
    Container,
    Row,
    Col
} from 'react-grid-system'
import SingleCheese from './SingleCheeseThumbnail'
import store, {
    GetCheeses
} from '../store/cheeses.js'
import {
    GetPurchasesAll,
    GetUnorderedPurchasesUser,
    UpdatePurchase,
    AddPurchase,
    DeletePurchase
} from '../store/purchases'
import RaisedButton from 'material-ui/RaisedButton';

class AllCheese extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadCheeses(this.props.user.id)
    }

    render() {

        let FilterProperties = {
            category: null,
            alphabetical: null,
            highestRating: null,
            lowestRating: null
        }

        return (<
            div className="container" >
            <
            div className="title" > Cheeses < /div> <
            RaisedButton label='Filter alphabetically' > < /RaisedButton> <
            RaisedButton label='Filter by rating (highest)' > < /RaisedButton> <
            RaisedButton label='Filter by rating (lowest)' > < /RaisedButton>  <
            div className="row" > {
                                    this.props.cheeses.map(cheese => {
                                        if (cheese.quantity > 0) {
                                            return (< div className="col-sm-4"
                                                key={
                                                    cheese.id
                                                } >
                                                <
                                                    SingleCheese indCheese={
                                                        cheese
                                                    }
                                                /> < /div >
                        )
                    }
                })
            } < /div> < /div >
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
            if (id) dispatch(GetUnorderedPurchasesUser(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCheese)