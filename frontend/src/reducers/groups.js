import { REQUEST_GROUPS, RECEIVE_GROUPS } from '../actions/groups'

export default function groups(
  state = {
    isFetching: false,
    entries: new Map()
  }, 
  action,
) {
  switch (action.type) {
    case REQUEST_GROUPS:
      return { ...state, isFetching: true }

    case RECEIVE_GROUPS:
      return { isFetching: false, entries: action.groups }

    default:
      return state
  }
}