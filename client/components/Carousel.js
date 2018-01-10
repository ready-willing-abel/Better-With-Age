import React from 'react'
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'

export default class CheeseCarousel extends React.Component  {
    render() {
        return (
            <Carousel>
                <div>
                    <img src="http://www.eatwisconsincheese.com/images/cheese/Cheddar-h.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Pecorino_romano_on_board_cropped.PNG" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="http://origin-www.fritolay.com/images/default-source/blue-bag-image/cheetos-fantastix-chili-cheese.png" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
};