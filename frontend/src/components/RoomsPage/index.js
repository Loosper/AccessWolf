import React from 'react'
import { Row } from 'react-bootstrap'
import EventColumn from './EventColumn'
import { connect } from 'react-redux'

function mapStateToProps({ events }) {
  const groupedByRoom = Object.values(events).reduce((map, event) => {
      map[event.room] = map[event.room] || []
      map[event.room].push(event)

      return map
    }, {})

  return { events: groupedByRoom }
}

function RoomsPage({ events }) {
  return (
    <>
      <h1>Rooms</h1>
      <div className="events-kanban">
        <Row>
          {Object.entries(events).map(([title, events]) => (
            <EventColumn key={title} events={events} name={title} />
          ))}
        </Row>
      </div>  
    </>
  )
}

export default connect(mapStateToProps)(RoomsPage)