import React, {Component} from 'react'
import {NavLink, Route, Switch, Redirect} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import RaisedButton from 'material-ui/RaisedButton';

import store, {logout} from '../store';

import {connect} from 'react-redux'


class Navbar extends Component {

  render() {
    const {isLoggedIn} = this.props

    return (
      <MuiThemeProvider>
      <div>
       
          <AppBar
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
                      <RaisedButton label='user' />
                    </NavLink>
                      <RaisedButton label='log out' onClick={this.props.handleLogout} />
                  </span>
                  :
                  <span className="unauthButtons">
                    <NavLink to='/login'>
                      <RaisedButton label='login' />
                    </NavLink>
                    <NavLink to='/signup'>
                      <RaisedButton label='signup' />
                    </NavLink>
                  </span>
                }
                
                


                <NavLink to='/cart'>
                  <RaisedButton label='cart' />
                </NavLink>
                <NavLink to='/cheeses'>
                  <RaisedButton label='all cheeses' />
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
