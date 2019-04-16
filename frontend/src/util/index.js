import { Map } from 'immutable'

export function list(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

export function toIDMap(entries) {
  if (!entries || (entries.length && !entries[0].id)) {
    throw new Error('Entries do not have id')
  }

  return Map(entries.reduce((map, entry) => {
    map[entry.id] = entry
    return map
  }, {}))
}
