import axios from 'axios'
import { toIDMap } from '.'

const BASE_URL = 'http://127.0.0.1:8000/api'

export async function getEvents() {
  return toIDMap(await get('/events'))
}

export async function getGroups() {
  const groups = await get('/groups')
  
  return toIDMap(groups.map(group => ({ ...group, people: [] })))
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