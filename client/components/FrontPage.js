import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import CheeseCarousel from './Carousel'
import AllCheese from './AllCheese'

export default class FrontPage extends Component {

    render() {
        return (
            <div>
                <h1 className= 'cursive'>Welcome to the Front Page</h1>
                <button type="button" className="btn btn-danger"> All Cheeses </button>
                <CheeseCarousel />
                <AllCheese />
             
            </div>
        )
    }
}
