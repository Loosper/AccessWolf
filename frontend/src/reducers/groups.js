import { REQUEST_GROUPS, RECEIVE_GROUPS } from '../actions/groups'
import Entries from '../util/entries'

export default function groups(
  state = new Entries(), 
  action,
) {
  switch (action.type) {
    case REQUEST_GROUPS:
      return state.setIsFetching(true)

    case RECEIVE_GROUPS:
      return state.setEntries(action.events)
        .setIsFetching(false)

    default:
      return state
  }
}