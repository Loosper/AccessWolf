import { Map, Record } from 'immutable'

const ENTRIES = '_entries'
const FETCHING = 'isFetching'

export default class Entries extends Record({
  [FETCHING]: false,
  [ENTRIES]: Map()
}) {
  get isFetching() {
    return this.get(FETCHING)
  }

  setIsFetching(value) {
    return this.set(FETCHING, value)
  }
  
  get entries() {
    return this.get(ENTRIES)
  }

  getEntry(id) {
    return this.getIn([ENTRIES, id])
  }

  setEntry(entry) {
    return this.setIn([ENTRIES, String(entry.id)], entry)
  }

  setEntries(entries) {
    return this.mergeIn([ENTRIES], entries)
  }
}