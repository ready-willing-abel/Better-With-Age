import React from 'react'
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'

export default class CheeseCarousel extends React.Component {

    render() {
        return (
            <Carousel
                autoPlay={true}
                interval={7000}
                transitionTime={500}
                infiniteLoop={true}
                stopOnHover={true}
                showStatus={false}
                width='750px'
            >
            <div>
                <img src="http://www.eatwisconsincheese.com/EatWisconsinCheese/media/content/hero%20images/hero-cheese.png" />
             </div>

             <div>
                <img src="http://www.eatwisconsincheese.com/EatWisconsinCheese/media/content/hero%20images/hero-cheese-5-2016.jpg" />
              </div>
        
            <div>
                <img src="https://www.greatlakescheese.com/Data/Sites/24/images/homepage/hp-hero-quality.jpg" /> 
            </div>

            <div>
                <img src="https://discoversg.com/wp-content/uploads/sites/32/2016/10/cheese-truck-Singapore-1024x535.png" />
            </div>
            </ Carousel>
        );
    }
};
