import React from 'react'
import { Row } from 'react-bootstrap'
import EventColumn from './EventColumn'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded } from '../../actions/events'
import { useFetch } from '../../util/hooks'
import { Map, List } from 'immutable'

function mapStateToProps({ events }) {
  return { 
    rooms: events.entries.reduce((rooms, event) => {
      const events = rooms.get(event.room.id) || List()
      
      return rooms.set(event.room.id, events.push(event))
    }, Map()).valueSeq().toArray()
  }
}

const mapDispatchToProps = {
  fetchEvents: fetchEventsIfNeeded
}

function RoomsPage({ rooms, fetchEvents, history: { push } }) {
  useFetch(fetchEvents)

  return (
    <>
      <h1>Rooms</h1>
      <div className="events-kanban">
        <Row>
          {rooms.map((events) => (
            <EventColumn 
              key={events.first().room.id} 
              name={events.first().room.name}
              events={events} 
              push={push}
            />
          ))}
        </Row>
      </div>  
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage)