import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import CheeseCarousel from './Carousel'
import Thumbnails from './ThumbnailShell'

export default class FrontPage extends Component {

    render() {
        return (
            <div>
                <div>Welcome to Front Page</div>
                <CheeseCarousel />
                <Thumbnails />
            </div>
        )
    }
}
