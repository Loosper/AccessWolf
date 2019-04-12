import axios from 'axios'
import { toIDMap } from '.'

const BASE_URL = 'http://127.0.0.1:8000/api'

export async function getEvents() {
  return toIDMap(await get('/events'))
}

export async function getRooms() {
  return toIDMap(await get('/rooms'))
}

export async function getPeople() {
  return toIDMap(await get('/people'))
}

async function get(url) {
  const { data } = await axios.get(`${BASE_URL}${url}/`)

  return data
}