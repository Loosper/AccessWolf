import React from 'react'
import { Col, Card } from 'react-bootstrap'

import './EventColumn.css'

function EventColumn({ name, events, push }) {
  return (
    <Col className='event-column'>
      <h1>{name}</h1>
      {events.map(event => (
        <Card key={event.id} onClick={() => push(`/events/${event.id}`)}>
          <Card.Img variant="top" src={event.image} />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>
              {event.description}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Col>
  )
}

export default React.memo(EventColumn)
