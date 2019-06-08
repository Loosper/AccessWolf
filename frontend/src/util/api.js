import axios from 'axios'
import { toIDMap, dateifyEvent } from '.'
import moment from 'moment'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 6000,
})

export async function getEvents() {
  const events = await api.get('events/')

  return toIDMap(events.data.map(dateifyEvent))
}

export async function getEvent(id) {
  const [event, { people }] = await Promise.all([api.get(`events/${id}/`), getAttendances(id)])
  event.data.attendances = people

  return dateifyEvent(event.data)
}

export async function getGroups() {
  const groups = await api.get('groups/')

  return toIDMap(groups.data)
}

export async function getPeople() {
  const people = await api.get('people/')

  return toIDMap(people.data)
}

export async function getRooms() {
  const rooms = await api.get('rooms/')
  return toIDMap(rooms.data)
}

export async function getAttendances(eventId) {
  const attendances = await api.get(`events/${eventId}/attendance/`)
  return attendances.data
}

export async function getPersonLocation(personId) {
  const location = await api.get(`where/${personId}/`)

  location.data.lastSeen = location.data.last_seen && moment(location.data.last_seen)
  location.data.id = personId

  return location.data
}

export async function getPersonAttendances(id) {
  const attendance = await api.get(`/people/${id}/events/`)
  attendance.data.events = attendance.data.events.map(dateifyEvent)
  attendance.data.id = id

  return attendance.data
}

export async function createEvent(event) {
  return api.post('events/', event)
}
