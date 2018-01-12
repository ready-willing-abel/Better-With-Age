import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'


export default class CheeseThumbnail extends Component {
    render(){
        return (
            <div>
                <h2 className='cursive'>Cheese Name: XXXXXXXX</h2>
                
                <img src = "http://www.eatwisconsincheese.com/images/cheese/Emmentaler-w.jpg"/>

                <button type="submit" className=" btn btn-secondary">BUY IT NOW.</button>
            </div>
        )



    }
}