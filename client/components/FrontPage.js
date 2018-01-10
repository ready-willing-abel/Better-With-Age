import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import CheeseCarousel from './Carousel'

export default class FrontPage extends Component {

    render() {
        return (
            <div>
                <div>Welcome to Front Page</div>
                <CheeseCarousel />
            </div>
        )
    }
}
