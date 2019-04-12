import React from 'react'
import { Row } from 'react-bootstrap'
import EventColumn from './EventColumn'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded } from '../../actions/events'
import { useFetch } from '../../util/hooks'

function mapStateToProps({ events }) {
  return { 
    events: [...events.entries.values()].reduce((map, event) => {
      if (!map.has(event.room)) {
        map.set(event.room, [])
      }

      map.get(event.room).push(event)

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

  return (
    <>
      <h1>Rooms</h1>
      <div className="events-kanban">
        <Row>
          {[...events.entries()].map(([title, events]) => (
            <EventColumn key={title} events={events} name={title} />
          ))}
        </Row>
      </div>  
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage)