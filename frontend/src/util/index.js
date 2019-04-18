import { Map, Record } from 'immutable'

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

export function recordMixin(...classes) {
  const state = {}
  
  for (const { defaultState } of classes) {
    Object.assign(state, defaultState)
  }

  const record = class extends Record(state) {}
  
  for (const { prototype } of classes) {
    for (const key of Object.getOwnPropertyNames(prototype)) {
      if (!record.prototype.hasOwnProperty(key)) {
        Object.defineProperty(record.prototype, key, Object.getOwnPropertyDescriptor(prototype, key))
      }
    }
  }

  return record
}