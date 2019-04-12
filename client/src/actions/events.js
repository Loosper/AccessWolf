import { getEvents } from '../util/api';

export const REQUEST_EVENTS = 'REQUEST_EVENTS'
function requestEvents() {
  return {
    type: REQUEST_EVENTS,
  }
}

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
function receiveEvents(events) {
  return {
    type: RECEIVE_EVENTS,
    events,
  }
}

function shouldFetchEvents(state) {
  return !state.events.isFetching
}

function fetchEvents() {
  return async dispatch => {
    dispatch(requestEvents())
    return receiveEvents(await getEvents())
  }
}

export function fetchEventsIfNeeded() {
  return async(dispatch, getState) => {
    if (shouldFetchEvents(getState())) {
      return dispatch(fetchEvents())
    } else {
      return Promise.resolve()
    }
  }
}
