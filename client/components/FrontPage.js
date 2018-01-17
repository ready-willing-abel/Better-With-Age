import React, { Component } from 'react'
import ReactDOM, { NavLink } from 'react-dom';
import CheeseCarousel from './Carousel'
import CheeseThumbnail from './ThumbnailShell'
import BestReviewedCheeses from './BestReviewedCheeses'
export default class FrontPage extends Component {

    render() {
        return (
            <center className="title container">
                <div className='subtitle'>Welcome to Better With Age</div>
                <CheeseCarousel />
                <div>Top Rated Cheeses</div>
                <BestReviewedCheeses />
            </center>
        )
    }
}
