import axios from 'axios'
import type { Message } from '../models/Message'
import { API_URL } from '../utils/urls'

async function fetchMessages(token: string, groupId: number): Promise<any> {
  try {
    const { data } = await axios.get(`${API_URL}/messages/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

async function postMessage(
  token: string,
  groupId: number,
  message: Message
): Promise<any> {
  try {
    const { data } = await axios.post(
      `${API_URL}/message/${groupId}`,
      { content: message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export { fetchMessages, postMessage }
