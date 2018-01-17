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
       
          <AppBar
          className="header"
          title='Better With Age'
          showMenuIconButton={false}
          style={{background: '#FFB74D'}}
          titleStyle={{margin: 'auto', fontSize: '2em'}}
          iconElementRight=
            {
              <div>
                {isLoggedIn ?
                  <span className="authButtons">
                    <NavLink to='/user'>
                      <CustomButton className='cursiveFont' label='User' />
                    </NavLink>
                      <CustomButton label='Log out' onClick={this.props.handleLogout} />
                  </span>
                  :
                  <span className="unauthButtons">
                    <NavLink to='/login'>
                      <CustomButton label='Login' />
                    </NavLink>
                    <NavLink to='/signup'>
                      <CustomButton label='Signup' />
                    </NavLink>
                  </span>
                }
                <NavLink to='/cart'>
                  <CustomButton label='Cart' />
                </NavLink>
                <NavLink to='/cheeses'>
                  <CustomButton label='All Cheeses' />
                </NavLink>
                </div>
            } 
          />
  
      </div>
    </MuiThemeProvider>
    )
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
