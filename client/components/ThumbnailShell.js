import React, {Component} from 'react'

import {Container, Row, Col} from 'react-grid-system'

import SingleCheese from './SingleCheeseThumbnail'

export default class Thumbnails extends Component {
    render() {
        return (
        <Container fluid style={{ lineHeight: '32px' }}>
       
        <Row align="center" style={{ height: '5px' }} debug>
            <Col debug><SingleCheese/></Col>
            <Col debug>2 of 6</Col>
            <Col debug>3 of 6</Col>
        </Row>
        <br />
        <Row align="center" style={{ height: '75px' }} debug>
            <Col debug>4 of 6</Col>
            <Col debug>5 of 6</Col>
            <Col debug>6 of 6</Col>
        </Row>
        </Container>
    )}
}