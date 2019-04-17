import { 
  REQUEST_EVENTS, 
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
 } from '../actions/events'
import Entries from '../records/entries'
import Fetchable from '../records/fetchable'
import { recordMixin } from '../util'

const State = recordMixin(Entries, Fetchable)

export default function events(state = new State(), action) {
  switch (action.type) {
    case REQUEST_EVENTS:
      return state.setIsFetching(true)

    case RECEIVE_EVENTS:
      return state.setEntries(action.events)
        .setIsFetching(false)

    case RECEIVE_EVENT:
      return state.setEntry(action.event)
        .setIsFetching(false)

    default:
      return state
  }
}