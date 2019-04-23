import React from 'react'
import { Row } from 'react-bootstrap'
import EventColumn from './EventColumn'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded } from '../../actions/events'
import { useFetch } from '../../util/hooks'
import roomsSelector from '../../selectors/rooms'

function mapStateToProps(state) {
  return { 
    rooms: roomsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchEvents: fetchEventsIfNeeded
}

function RoomsPage({ rooms, fetchEvents, history: { push } }) {
  useFetch(fetchEvents)

  return (
    <>
      <header>
        <h1>Rooms</h1>
      </header>
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