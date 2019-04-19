import { getPeople, getPersonLocation, getPersonAttendances } from '../util/api'

export const REQUEST_PEOPLE = 'REQUEST_PEOPLE'
function requestPeople() {
  return {
    type: REQUEST_PEOPLE,
  }
}

export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'
function receivePeople(people) {
  return {
    type: RECEIVE_PEOPLE,
    people,
  }
}

function shouldFetchPeople(state) {
  return !state.people.isFetching
}

function fetchPeople() {
  return async dispatch => {
    dispatch(requestPeople())
    return dispatch(receivePeople(await getPeople()))
  }
}

export function fetchPeopleIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPeople(getState())) {
      return dispatch(fetchPeople())
    } else {
      return Promise.resolve()
    }
  }
}

export const REQUEST_LOCATION = 'REQUEST_LOCATION'
function requestLocation(userId) {
  return {
    type: REQUEST_LOCATION,
    userId,
  }
}

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION'
function receiveLocation(userId, location) {
  return {
    type: RECEIVE_LOCATION,
    userId,
    location,
  }
}

export function fetchLocation(userId) {
  return async dispatch => {
    dispatch(requestLocation(userId))
    const location = await getPersonLocation(userId)
    return dispatch(receiveLocation(userId, location))
  }
}

export const REQUEST_ATTENDANCES = 'REQUEST_ATTENDANCES'
function requestAttendances(userId) {
  return {
    type: REQUEST_ATTENDANCES,
    userId,
  }
}

export const RECEIVE_ATTENDANCES = 'RECEIVE_ATTENDANCES'
function receiveAttendances(userId, attendances) {
  return {
    type: RECEIVE_ATTENDANCES,
    userId,
    attendances,
  }
}

export function fetchAttendances(userId) {
  return async dispatch => {
    dispatch(requestAttendances(userId))
    const attendances = await getPersonAttendances(userId)
    return dispatch(receiveAttendances(userId, attendances))
  }
}
