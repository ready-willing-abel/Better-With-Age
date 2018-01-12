import React, {Component} from 'react'
import {NavLink, Route, Switch, Redirect} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import RaisedButton from 'material-ui/RaisedButton';

import store from '../store';


export default class Navbar extends Component {

  render() {
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
                <NavLink to='/login'>
                  <RaisedButton label='login' />
                </NavLink>
                <NavLink to='/signup'>
                  <RaisedButton label='signup' />
                </NavLink>
                <NavLink to='/checkout'>
                  <RaisedButton label='checkout' />
                </NavLink>

                <NavLink to='/user'>
                  <RaisedButton label='user' />
                </NavLink>

                <NavLink to='/cart'>
                  <RaisedButton label='cart' />
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
