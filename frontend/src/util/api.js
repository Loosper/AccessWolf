import axios from 'axios'
import { toIDMap, dateifyEvent } from '.'

const BASE_URL = 'http://127.0.0.1:8000/api'

export async function getEvents() {
  const events = await get('/events')

  return toIDMap(events.map(dateifyEvent))
}

export async function getEvent(id) {
  const [event, { people }] = await Promise.all([get(`/events/${id}`), getAttendances(id)])
  event.attendances = people
  
  return dateifyEvent(event)
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

export function getAttendances(eventId) {
  return get(`/events/${eventId}/attendance`)
}

export async function getPersonLocation(personId) {
  const location = await get(`/where/${personId}`)

  location.last_seen = new Date(location.last_seen)
  location.id = personId
  
  return location
}

export async function getPersonAttendances(id) {
  const attendance = await get(`/people/${id}/events`)
  attendance.events = attendance.events.map(dateifyEvent)
  attendance.id = id

  return attendance
}

async function get(url) {
  const { data } = await axios.get(`${BASE_URL}${url}/`)

  return data
}