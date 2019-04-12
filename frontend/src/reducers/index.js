import { combineReducers } from 'redux'

import events from './events'
import people from './people'
import groups from './groups'

export default combineReducers({
  events,
  people,
  groups,
})
