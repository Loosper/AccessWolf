import { RECEIVE_ATTENDANCES } from '../actions/people'
import { recordMixin } from '../util'
import Entries from '../records/entries'

const State = recordMixin(Entries)

export default function attendances(state = new State(), action) {
  switch (action.type) {
    case RECEIVE_ATTENDANCES: 
      return state.setEntry(action.attendances)

    default:
      return state
  }
}