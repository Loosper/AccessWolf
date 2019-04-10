import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import './index.css'
import { connect } from 'react-redux'

const localizer = BigCalendar.momentLocalizer(moment)

function mapStateToProps({ events }) {
  return { events: Object.values(events) }
}

function EventsPage({ events }) {
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

export default connect(mapStateToProps)(EventsPage)
