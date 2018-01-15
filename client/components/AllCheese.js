import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Container, Row, Col} from 'react-grid-system'
import SingleCheese from './SingleCheeseThumbnail'
import store, { GetCheeses } from '../store/cheeses.js'


class AllCheese extends Component {

    constructor(props) {
        super(props)
      }

    componentDidMount () {
        this.props.loadCheeses()
      }

render () {
    console.log(this.props)
        return (
        <div className = "container">
        <h1 className="cursive">Cheeses</h1>
            <div className = "row"> 
                {this.props.cheeses.map(cheese => {
                    return (
                        <div className=" col-sm-4 cursive" key={cheese.id}> 
                        <h3>{cheese.name}</h3>
                        <SingleCheese />
                        </div>
                    )
                    })
                }





                <div className="col-sm-4">
                    <SingleCheese /><br/>
                </div>
                <div className="col-sm-4">
                        <SingleCheese /><br/>
                </div>
                <div className="col-sm-4">
                    <SingleCheese />
                </div>

                <div className = "row">
                    <div className="col-sm-4">
                        <SingleCheese /><br/>
                    </div>
                    <div className="col-sm-4">
                            <SingleCheese /><br/>
                    </div>
                    <div className="col-sm-4">
                        <SingleCheese />
                    </div>
                </div>
            </div>

        </div>
        )

    }   

}

function mapStateToProps(storeState){
    return {
        cheeses: storeState.cheeses
    }
}
  
  function mapDispatchToProps(dispatch) {
    return {
      loadCheeses: ()=>{
        console.log('mounting')
        dispatch(GetCheeses())
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AllCheese)