import React, { Component } from 'react'
import ReactDOM, { NavLink } from 'react-dom';
import CheeseCarousel from './Carousel'
import AllCheese from './AllCheese'
export default class FrontPage extends Component {

    render() {
        const style = { height: '50px' }
        return (
            <div>
                <h1 className='cursive'>Welcome to the Front Page</h1>
                <CheeseCarousel />
            </div>
        )
    }
}
