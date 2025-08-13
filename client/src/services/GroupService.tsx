import axios from 'axios'
import type { User } from '../models/User'
import { GROUPE_URL } from '../utils/urls'

async function fetchGroups(token: string): Promise<User[]> {

  try {
    const { data } = await axios.get(
      GROUPE_URL,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  } catch (error) {
    console.error('Creating group error:', error)
    throw error
  }
}

async function createGroup(groupData: any, token: string): Promise<any> {
  try {
    const { data } = await axios.post(
      GROUPE_URL,
      groupData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return data
  } catch (error) {
    console.error('Creating group error:', error)
    throw error
  }
}


export { fetchGroups, createGroup }
