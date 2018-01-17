import React, {Component} from 'react'
import {NavLink, Route, Switch, Redirect} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import RaisedButton from 'material-ui/RaisedButton';
import {CustomButton} from './customButton';

import store, {logout} from '../store';

import {connect} from 'react-redux'


class Navbar extends Component {

  render() {
    const {isLoggedIn} = this.props

    return (
      <MuiThemeProvider>
      <div>
        <div className='cursive nav-container'>
          <AppBar

          title='Better With Age'
          showMenuIconButton={false}
          iconElementRight=
            {
              <div>
                {isLoggedIn ?
                  <div className="authButtons">
                    <NavLink to='/user'>
                      <CustomButton label='User' />
                    </NavLink>
                      <CustomButton label='Log out' onClick={this.props.handleLogout} />
                  </div>
                  :
                  <div className="unauthButtons">
                    <NavLink to='/login'>
                      <CustomButton label='Login' />
                    </NavLink>
                    <NavLink to='/signup'>
                      <CustomButton label='Signup' />
                    </NavLink>
                  </div>
                }
                <NavLink to='/checkout'>
                  <CustomButton label='Checkout' />
                </NavLink>
                <NavLink to='/cart'>
                  <CustomButton label='Cart' />
                </NavLink>
                <NavLink to='/cheeses'>
                  <CustomButton label='All cheeses' />
                </NavLink>
              </div>
            }
          style={{background: '#206c99'}}
          titleStyle={{margin: 'auto', fontSize: '2em'}}
          />
        </div>
      </div>
    </MuiThemeProvider>)
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleLogout (evt) {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
