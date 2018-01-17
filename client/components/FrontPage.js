import React, { Component } from 'react'
import ReactDOM, { NavLink } from 'react-dom';
import CheeseCarousel from './Carousel'
import CheeseThumbnail from './ThumbnailShell'
export default class FrontPage extends Component {

    render() {
        return (
            <center className= "container">
                <div className='title'>Welcome to BWA</div>
                <CheeseCarousel />
            </center>
        )
    }
}
