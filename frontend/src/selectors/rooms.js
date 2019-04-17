import { createSelector } from 'reselect'
import { List, Map } from 'immutable'

const roomsSelector = createSelector(
  state => state.events.entries,
  events => events.reduce((rooms, event) => {
    const events = rooms.get(event.room.id) || List()
    
    return rooms.set(event.room.id, events.push(event))
  }, Map())
    .valueSeq()
    .toArray()
)

export default roomsSelector