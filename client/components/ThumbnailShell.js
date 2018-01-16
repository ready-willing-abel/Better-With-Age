import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import CheeseThumbnail from './SingleCheeseThumbnail'

export default class Thumbnails extends Component {
    render() {
        

        return (
            <div>

                <div>
                    <Col><CheeseThumbnail /></Col>
                    <Col><CheeseThumbnail /></Col>
                    <Col><CheeseThumbnail /></Col>
                </div>
                <Row align="center" style={{ height: '100px' }}>
                    <Col><CheeseThumbnail /></Col>
                    <Col><CheeseThumbnail /></Col>
                    <Col><CheeseThumbnail /></Col>
                </Row>
            </div>
        )
    }
}