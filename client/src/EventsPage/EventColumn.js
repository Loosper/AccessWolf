import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import './EventColumn.css'

export default function EventColumn({ name, events }) {
  return (
    <Col className='event-column'>
      <h1>{name}</h1>
          {events.map(event => (
            <Card>
			<Row>
			<Col xs={4}>
              <Card.Img variant="top" src={event.image} />
			</Col>
			<Col>
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                  {event.description}
                </Card.Text>
              </Card.Body>
			</Col>
			</Row>
			<Row>
                <Button variant="primary">Go somewhere</Button>
			</Row>
            </Card>
          ))}
    </Col>
  )
}
