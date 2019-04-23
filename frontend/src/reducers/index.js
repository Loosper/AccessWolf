import { combineReducers } from 'redux'

import events from './events'
import people from './people'
import groups from './groups'
import attendances from './attendances'
import locations from './locations'
import rooms from './rooms'

export default combineReducers({
  events,
  people,
  groups,
  attendances,
  locations,
  rooms,
})
