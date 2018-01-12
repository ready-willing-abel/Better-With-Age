import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';

export default class CheeseThumbnail extends Component {
    render() {

        return (
            <div >
                <img src="https://woodys-smokehouse.com/wp-content/uploads/2014/06/sa_cheese_festival_give_small_cheese_makers_an_economic_boost_link.jpg" />
                <div>Cheese Name: Test Cheese</div>
                <div>Cheese Price: One million dollars</div>
                <div><RaisedButton label='Buy some of this' /></div>
            </div>
        )
    }
}