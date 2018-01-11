import React, { Component } from 'react'

import { Container, Row, Col } from 'react-grid-system'

import SingleCheese from './SingleCheeseThumbnail'

export default class Thumbnails extends Component {
    render() {
        return (
            <Container fluid style={{ lineHeight: '100px' }}>

                <Row align="center" style={{ height: '50px' }} debug>
                    <Col debug><SingleCheese /></Col>
                    <Col debug><SingleCheese /></Col>
                    <Col debug><SingleCheese /></Col>
                </Row>
                <br />
                <Row align="center" style={{ height: '50px' }} debug>
                    <Col debug><SingleCheese /></Col>
                    <Col debug><SingleCheese /></Col>
                    <Col debug><SingleCheese /></Col>
                </Row>
            </Container>
        )
    }
}