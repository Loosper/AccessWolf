import { REQUEST_EVENTS, RECEIVE_EVENTS } from '../actions/events'

export default function events(
  state = {
    isFetching: false,
    entries: new Map()
  }, 
  action,
) {
  switch (action.type) {
    case REQUEST_EVENTS:
      return { ...state, isFetching: true }

    case RECEIVE_EVENTS:
      return { isFetching: false, entries: action.events }

    default:
      return state
  }
}