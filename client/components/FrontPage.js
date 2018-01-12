import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import CheeseCarousel from './Carousel'
import Thumbnails from './ThumbnailShell'
import SingleCheeseThumbnail from './SingleCheeseThumbnail'

export default class FrontPage extends Component {

    render() {
        const style = { height: '50px' }
        return (
            <div>
                <div>Welcome to Front Page</div>
                <div style={style} ><CheeseCarousel /></div>
                <div ><Thumbnails /></div>
            </div>
        )
    }
}
