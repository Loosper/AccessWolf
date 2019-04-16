import { 
  REQUEST_EVENTS, 
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
 } from '../actions/events'
import Entries from '../util/entries'

export default function events(
  state = new Entries(), 
  action,
) {
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