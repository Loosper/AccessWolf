import { RECEIVE_LOCATION } from '../actions/people'
import { recordMixin } from '../util'
import Entries from '../records/entries'

const State = recordMixin(Entries)

export default function locations(state = new State(), action) {
  switch (action.type) {
    case RECEIVE_LOCATION: 
      return state.setEntry(action.location)

    default:
      return state
  }
}