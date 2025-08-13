import axios from 'axios'
import type { User } from '../models/User'
import { USERS_URL } from '../utils/urls'

async function fetchUsers(): Promise<User[]> {
  try {
    const { data } = await axios.get(USERS_URL)

    return data
  } catch (error) {
    console.error('Fetching error:', error)
    throw error
  }
}

async function fetchUserById(id: number): Promise<User> {
  try {
    const { data } = await axios.get(`${USERS_URL}/${id}`)

    return data
  } catch (error) {
    console.error('Fetching error:', error)
    throw error
  }
}

export { fetchUsers, fetchUserById }
