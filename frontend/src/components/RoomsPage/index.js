import React from 'react'
import { Row } from 'react-bootstrap'
import EventColumn from './EventColumn'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded } from '../../actions/events'
import { useFetch } from '../../util/hooks'

function mapStateToProps({ events }) {
  return { 
    events: [...events.entries.values()].reduce((map, event) => {
      if (!map.has(event.room.id)) {
        map.set(event.room.id, [])
      }

      map.get(event.room.id).push(event)

      return map
    }, new Map()) 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvents: () => dispatch(fetchEventsIfNeeded())
  }
}

function RoomsPage({ events, fetchEvents }) {
  useFetch(fetchEvents)

  console.log(events)

  return (
    <>
      <h1>Rooms</h1>
      <div className="events-kanban">
        <Row>
          {[...events.values()].map((events) => (
            <EventColumn 
              key={events[0].room.id} 
              events={events} 
              name={events[0].room.name} 
            />
          ))}
        </Row>
      </div>  
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage)