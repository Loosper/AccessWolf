import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded } from '../../actions/events'
import { useFetch } from '../../util/hooks'

import './index.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment)

function mapStateToProps({ events, isFetching }) {
  return { 
    events: events.entries, 
    isFetching 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvents: () => dispatch(fetchEventsIfNeeded())
  }
}

function EventsPage({ events, fetchEvents, isFetching }) {
  useFetch(fetchEvents)

  return (
    <>
      <header>
        <h1>Events</h1>
      </header>
      <BigCalendar
        localizer={localizer}
        events={events.valueSeq().toArray()}
        startAccessor="start"
        endAccessor="end"
      />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage)
