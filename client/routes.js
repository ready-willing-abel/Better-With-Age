import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, FrontPage, Login, Signup, UserHome, AllCheese, SingleCheese } from './components'
import { me } from './store'
import UserPage from './components/user-page/userPage'
import Cart from './components/Cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/cheeses" component={AllCheese} />
            <Route path="/cart" component={Cart} />
            <Route path="/cheeses/:id" component={SingleCheese} />
            {
              isLoggedIn ?
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/user" component={UserPage} />
                  <Route component={FrontPage} />
                </Switch>
                :
                <Switch>
                  {/* Routes placed here are only if not logged in */}
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route component={FrontPage} />
                </Switch>
            }
            <Route component={FrontPage} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
