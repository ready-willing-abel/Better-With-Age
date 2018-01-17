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

class BestReviewedCheeses extends Component {

    constructor(props) {
        super(props)
        this.cheeseFilter = this.cheeseFilter.bind(this)
    }

    componentDidMount() {
        this.props.loadCheeses(this.props.user.id)
    }

    cheeseFilter(cheeses) {
        let sortedCheeses = cheeses;

        sortedCheeses = sortedCheeses.map(function (cheese) {
            if (cheese.totalReviews === 0) cheese.average = 0;
            else {
                cheese.average = cheese.totalRatingSum / cheese.totalReviews
            }
            return cheese
        })
            .sort(function (a, b) {
                let cheeseA = a.average
                let cheeseB = b.average
                return (cheeseA > cheeseB) ? -1 : (cheeseA < cheeseB) ? 1 : 0;
            })
        return sortedCheeses.slice(0, 3)
    }

    render() {
        let topCheeses = this.cheeseFilter(this.props.cheeses)

        return (<div>
            {topCheeses.map(cheese => {
                return (
                    < div className="col-sm-4" key={cheese.id} >
                        <SingleCheese indCheese={cheese} />
                    </div>)
            }
            )}
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
            if (id) dispatch(GetUnorderedPurchasesUser(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BestReviewedCheeses)