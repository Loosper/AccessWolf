import axios from 'axios'
import { toIDMap } from '.'
import { List } from 'immutable'

const BASE_URL = 'http://127.0.0.1:8000/api'

export async function getEvents() {
  const events = await get('/events')

  return toIDMap(events.map(({ start, end, ...event }) => ({ 
    ...event, 
    start: new Date(start),
    end: new Date(end),
  })))
}

export function getEvent(id) {
  return get(`/events/${id}`)
}

export async function getGroups() {
  const groups = await get('/groups')

  return toIDMap(groups)
}

export async function getPeople() {
  return toIDMap(await get('/people'))
}

export async function getRooms() {
  return toIDMap(await get('/rooms'))
}

async function get(url) {
  const { data } = await axios.get(`${BASE_URL}${url}/`)

  return data
}