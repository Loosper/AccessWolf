import { REQUEST_ROOMS, RECEIVE_ROOMS } from '../actions/rooms';
import Entries from '../records/entries'
import { recordMixin } from '../util'
import Fetchable from '../records/fetchable'

const State = recordMixin(Entries, Fetchable)

export default function groups(state = new State(), action) {
  switch (action.type) {
    case REQUEST_ROOMS:
      return state.setIsFetching(true)

    case RECEIVE_ROOMS:
      return state.setEntries(action.rooms)
        .setIsFetching(false)

    default:
      return state
  }
}