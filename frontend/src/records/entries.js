import { Map } from 'immutable'

const ENTRIES = '_entries'

export default class Entries {
  static defaultState = {
    [ENTRIES]: Map()
  }

  get entries() {
    return this.get(ENTRIES)
  }

  getEntry(id) {
    return this.getIn([ENTRIES, id])
  }

  setEntry(entry) {
    return entry.id ? this.setIn([ENTRIES, String(entry.id)], entry) : this
  }

  setEntries(entries) {
    return this.mergeIn([ENTRIES], entries)
  }
}