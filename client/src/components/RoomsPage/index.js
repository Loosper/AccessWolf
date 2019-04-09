import React from 'react'
import { Row } from 'react-bootstrap'
import EventColumn from './EventColumn'

const events = [
  {
    id: 1,
    title: 'Math',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }]
  },
  {
    id: 2,
    title: 'Bel',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }]
  },
  {
    id: 4,
    title: 'Da',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }]
  },
  {
    id: 3,
    title: 'Ne',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }]
  },
  {
    id: 5,
    title: 'Da',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }]
  },
  {
    id: 6,
    title: 'Ne',
    description: 'wow so amazing',
    start: new Date(),
    end: new Date(),
    image: "https://www.boell.de/sites/default/files/uploads/2016/06/brexit.png",
    organizers: [{
      title: 'Tumor'
    }]
  }
]

events[1].start.setDate(6)
events[3].start.setDate(6)

const grouped = events.reduce((map, event) => {
  map[event.start.getDate()] = map[event.start.getDate()] || []

  map[event.start.getDate()].push(event)

  return map
}, {})

export default function RoomsPage() {
  return (
    <>
      <h1>Rooms</h1>
      <div className="events-kanban">
        <Row>
          {Object.entries(grouped).map(([title, events]) => (
            <EventColumn key={title} events={events} name={title} />
          ))}
        </Row>
      </div>  
    </>
  )
}