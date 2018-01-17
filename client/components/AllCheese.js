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

    this.state = {
      price: false,
      alphabetical: false,
      rating: false,
    }

    this.handleAlphClick = this.handleAlphClick.bind(this);
    this.handleRatingClick = this.handleRatingClick.bind(this);
    this.handlePriceClick = this.handlePriceClick.bind(this);
    this.cheeseFilter = this.cheeseFilter.bind(this)
  }

  componentDidMount() {
    this.props.loadCheeses(this.props.user.id)
  }

  cheeseFilter(cheeses) {
    let sortedCheeses = cheeses;

    /// sort alphabetically
    if (this.state.alphabetical) {
      sortedCheeses.sort(function (a, b) {
        let cheeseA = a.name.toUpperCase();
        let cheeseB = b.name.toUpperCase()
        return (cheeseA < cheeseB) ? -1 : (cheeseA > cheeseB) ? 1 : 0;
      })
    }

    // sort by price
    if (this.state.price) {
      sortedCheeses.sort(function (a, b) {
        let cheeseA = a.price
        let cheeseB = b.price
        return (cheeseA < cheeseB) ? -1 : (cheeseA > cheeseB) ? 1 : 0;
      })
    }

    // // sort by rating
    if (this.state.rating) {
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
    }

    return sortedCheeses
  }

  handleAlphClick() {
    this.setState({
      price: false,
      alphabetical: true,
      rating: false,
    });
  }
  handleRatingClick() {
    this.setState({
      price: false,
      alphabetical: false,
      rating: true,
    });
  }
  handlePriceClick() {
    this.setState({
      price: true,
      alphabetical: false,
      rating: false,
    });
  }

  render() {
    let filteredCheeses = this.cheeseFilter(this.props.cheeses)

    return ( 
      <div className = "container" >
      <div className = "title"> Cheeses </div> 
      <RaisedButton label = 'Filter alphabetically'
      onClick = {
        this.handleAlphClick
      } > < /RaisedButton> <
      RaisedButton label = 'Filter by rating'
      onClick = {
        this.handleRatingClick
      } > < /RaisedButton> <
      RaisedButton label = 'Filter by price'
      onClick = {
        this.handlePriceClick
      } > < /RaisedButton>  <
      div className = "row" > {

        filteredCheeses.map(cheese => {
          if (cheese.quantity > 0) {
            return ( < div className = "col-sm-4"
              key = {
                cheese.id
              } >
              <
              SingleCheese indCheese = {
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