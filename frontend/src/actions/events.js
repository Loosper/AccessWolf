import { getEvents, getEvent } from '../util/api'

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

export const RECEIVE_EVENT = 'RECEIVE_EVENT'
function receiveEvent(event) {
  return {
    type: RECEIVE_EVENT,
    event,
  }
}

function shouldFetchEvents(state) {
  return !state.events.isFetching
}

function fetchEvents() {
  return async dispatch => {
    dispatch(requestEvents())
    return dispatch(receiveEvents(await getEvents()))
  }
}

export function fetchEventsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEvents(getState())) {
      return dispatch(fetchEvents())
    } else {
      return Promise.resolve()
    }
  }
}

export function fetchEvent(id) {
  return async (dispatch) => {
    dispatch(requestEvents())
    return dispatch(receiveEvent(await getEvent(id)))
  }
}
