import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import EventColumn from './EventColumn'

const events = [
  {
    id: 1,
    name: 'Math',
    description: 'wow so amazing',
    dateStart: new Date(),
    dateEnd: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    groups: [{
      name: 'Tumor'
    }]
  },
  {
    id: 2,
    name: 'Bel',
    description: 'wow so amazing',
    dateStart: new Date(),
    dateEnd: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    groups: [{
      name: 'Tumor'
    }]
  },
  {
    id: 4,
    name: 'Da',
    description: 'wow so amazing',
    dateStart: new Date(),
    dateEnd: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    groups: [{
      name: 'Tumor'
    }]
  },
  {
    id: 3,
    name: 'Ne',
    description: 'wow so amazing',
    dateStart: new Date(),
    dateEnd: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    groups: [{
      name: 'Tumor'
    }]
  },
  {
    id: 5,
    name: 'Da',
    description: 'wow so amazing',
    dateStart: new Date(),
    dateEnd: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    groups: [{
      name: 'Tumor'
    }]
  },
  {
    id: 6,
    name: 'Ne',
    description: 'wow so amazing',
    dateStart: new Date(),
    dateEnd: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    groups: [{
      name: 'Tumor'
    }]
  }
]

events[1].dateStart.setDate(5)
events[3].dateStart.setDate(5)
const grouped = events.reduce((map, event) => {
  map[event.dateStart.getDate()] = map[event.dateStart.getDate()] || []

  map[event.dateStart.getDate()].push(event)

  return map
}, {})

export default function EventsPage() {
  return (
    <Row className="events-background">
      {Object.entries(grouped).map(([name, events]) => (
        <EventColumn key={name} events={events} name={name} />
      ))}
    </Row>
  )
}