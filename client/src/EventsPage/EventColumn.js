import React from 'react'
import { Col, Card } from 'react-bootstrap'
import './EventColumn.css'

export default function EventColumn({ name, events }) {
  return (
    <Col className='event-column'>
      <h1>{name}</h1>
      <div>
        {events.map(event => (
          <Card>
            <Card.Img variant="top" src={event.image} />
            <Card.Body>
              <Card.Title>{event.name}</Card.Title>
              <Card.Text>
                {event.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Col>
  )
}
