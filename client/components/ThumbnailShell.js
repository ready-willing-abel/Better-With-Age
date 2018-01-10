import React, {Component} from 'react'
import grid from 'react-grid-system'

export default class Thumbnails extends Component {
    render() {
        <Container fluid style={{ lineHeight: '32px' }}>
       
        <Row align="center" style={{ height: '75px' }} debug>
            <Col debug>1 of 6</Col>
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
    }
}