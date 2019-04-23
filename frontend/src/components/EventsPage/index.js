import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded } from '../../actions/events'
import { useFetch } from '../../util/hooks'

import './index.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { ModalContext } from '../shared/EventModal'

moment.updateLocale('en', {
  week: {
    dow: 1
  }
});

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

function EventsPage({ events, fetchEvents, history: { push } }) {
  useFetch(fetchEvents)

  return (
    <>
      <header>
        <h1>Events</h1>
      </header>
      <ModalContext.Consumer>
        {({ open, close }) => (
          <BigCalendar
            selectable
            // culture='en-GB'
            // components={{ event: (props) => <div>{console.log(props)}</div> }}
            onSelecting={open}
            onSelectEvent={({ id }) => push(`/events/${id}`)}
            localizer={localizer}
            events={events.valueSeq().toArray()}
            startAccessor="start"
            endAccessor="end"
          />
        )}
      </ModalContext.Consumer>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage)
