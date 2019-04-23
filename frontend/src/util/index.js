import { Map, Record } from 'immutable'
import moment from 'moment'

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
	return date.calendar()
}

export function dateifyEvent(event) {
  const start = moment(event.start)
  const end = moment(event.end) 
  const duration = moment(+end - +start)

  return { 
    ...event, 
    start, 
    end,
    duration,
  }
}

export function hourFormat(ms) {
  const duration = moment.duration(ms)
  console.log(ms, duration)
  const hours = duration.hours() + (duration.days() * 24)
  const minutes = duration.minutes()
  
  return [hours ? hours + ' hours' : '', minutes ? minutes + ' hours' : ''].join(' ')
}