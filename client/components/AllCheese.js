import React, {Component} from 'react'

import { connect } from 'react-redux'

import {Container, Row, Col} from 'react-grid-system'

import SingleCheese from './SingleCheeseThumbnail'


function AllCheese (props) {

  
        return (
        <div className = "container">
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

const mapStateToProps = function (state) {
    return {
        cheeses: state.cheeses
    }
}


const mapDispatchToProps = (dispatch) => {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCheese)