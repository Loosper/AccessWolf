import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import './index.css'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded } from '../../actions/events'

const localizer = BigCalendar.momentLocalizer(moment)

function mapStateToProps({ events, isFetching }) {
  return { events: [...events.entries.values()], isFetching }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvents() {
      dispatch(fetchEventsIfNeeded())
    }
  }
}

function EventsPage({ events, fetchEvents, isFetching }) {
  React.useEffect(fetchEvents, [])

  return (
    <>
      <h1>Events</h1>
      {isFetching}
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
