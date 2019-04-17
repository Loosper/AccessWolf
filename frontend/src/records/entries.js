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
    return this.setIn([ENTRIES, String(entry.id)], entry)
  }

  setEntries(entries) {
    return this.mergeIn([ENTRIES], entries)
  }
}