import { REQUEST_GROUPS, RECEIVE_GROUPS } from '../actions/groups'
import Entries from '../records/entries'
import { recordMixin } from '../util'
import Fetchable from '../records/fetchable'

const State = recordMixin(Entries, Fetchable)

export default function groups(state = new State(), action) {
  switch (action.type) {
    case REQUEST_GROUPS:
      return state.setIsFetching(true)

    case RECEIVE_GROUPS:
      return state.setEntries(action.groups)
        .setIsFetching(false)

    default:
      return state
  }
}