import { REQUEST_PEOPLE, RECEIVE_PEOPLE } from '../actions/people'
import Entries from '../util/entries'

export default function people(state = new Entries(), action) {
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