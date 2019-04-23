import { getRooms } from '../util/api'

export const REQUEST_ROOMS = 'REQUEST_ROOMS'
function requestRooms() {
  return {
    type: REQUEST_ROOMS,
  }
}

export const RECEIVE_ROOMS = 'RECEIVE_ROOMS'
function receiveRooms(rooms) {
  return {
    type: RECEIVE_ROOMS,
    rooms,
  }
}

function shouldFetchRooms(state) {
  return !state.rooms.isFetching
}

function fetchRooms() {
  return async dispatch => {
    dispatch(requestRooms())
    return dispatch(receiveRooms(await getRooms()))
  }
}

export function fetchRoomsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchRooms(getState())) {
      return dispatch(fetchRooms())
    } else {
      return Promise.resolve()
    }
  }
}
