import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded } from '../../actions/events'
import { useFetch } from '../../util/hooks'

import './index.css'

const localizer = BigCalendar.momentLocalizer(moment)

function mapStateToProps({ events, isFetching }) {
  return { events: [...events.entries.values()], isFetching }
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
      <h1>Events</h1>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage)