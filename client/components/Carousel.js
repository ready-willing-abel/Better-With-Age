import React from 'react'
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import {
    connect
} from 'react-redux'
import store, {
    GetCheeses
} from '../store/cheeses.js'

class CheeseCarousel extends React.Component {

    constructor(props) {
        super(props)
        // this.threeRandos = this.threeRandos.bind(this);
    }

    componentDidMount() {
        this.props.loadCheeses();
    }

    render() {

        const randoids = (n, lim) => {
            let randos = []
            let rand = 0
            for (var i = 0; randos.length < n && rand < 100; rand++) {
                i += (Math.random() * lim - i) | 0
                if (!randos.includes(i)) randos.push(i)
            }
            return randos
        }

        let rand = randoids(3, this.props.cheeses.length - 1)


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
                {
                    this.props.cheeses.filter((v, i) => rand.includes(i)).map(function (cheese) {
                        return (<div>
                            <img src={cheese.imageUrl} />
                            <p className="legend">{cheese.name}</p>
                        </div>
                        )
                    })
                }
            </ Carousel>
        );
    }
};



function mapStateToProps(storeState) {
    return {
        cheeses: storeState.cheeses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCheeses: (id) => {
            dispatch(GetCheeses())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheeseCarousel)