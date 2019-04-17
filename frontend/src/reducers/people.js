import { REQUEST_PEOPLE, RECEIVE_PEOPLE } from '../actions/people'
import Entries from '../records/entries'
import { recordMixin } from '../util'
import Fetchable from '../records/fetchable'

const State = recordMixin(Entries, Fetchable)

export default function people(state = new State(), action) {
  switch (action.type) {
    case REQUEST_PEOPLE:
      return state.setIsFetching(true)

    case RECEIVE_PEOPLE:
      return state.setEntries(action.people)
        .setIsFetching(false)

    default:
      return state
  }
}