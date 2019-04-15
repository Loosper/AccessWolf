import { getPeople } from '../util/api'

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
