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

export function formatDate(date) {
	const options = {
		year: date.getFullYear() === new Date().getFullYear() ? void 0 : 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}

	return date.toLocaleDateString('en-US', options)
}

export function dateifyEvent(event) {
  const start = new Date(event.start)
  const end = new Date(event.end) 
  const duration = new Date(+end - +start)

  return { 
    ...event, 
    start, 
    end,
    duration,
  }
}

export function hourFormat(date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  
  return [hours ? hours + ' hours' : '', minutes ? minutes + ' hours' : ''].join(' ')
}