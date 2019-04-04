import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';


export default function EventPage({ match: { params: { id } } }) {
  return (
    <Container>
	  <Row>
		<Col>1 of 2</Col>
		<Col>2 of 2</Col>
	  </Row>
	  <Row>
		<Col>1 of 3</Col>
		<Col>2 of 3</Col>
		<Col>3 of 3</Col>
	  </Row>
	</Container>
  )
}