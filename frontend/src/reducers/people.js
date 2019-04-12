import { REQUEST_PEOPLE, RECEIVE_PEOPLE } from '../actions/people'

export default function people(
  state = {
    isFetching: false,
    entries: new Map()
  }, 
  action,
) {
  switch (action.type) {
    case REQUEST_PEOPLE:
      return { ...state, isFetching: true }

    case RECEIVE_PEOPLE:
      return { isFetching: false, entries: action.people }

    default:
      return state
  }
}