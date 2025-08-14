import axios from 'axios'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Login, Register } from '../models/Auth'
import { AUTH_URL } from '../utils/urls'

interface AuthContextType {
  token: string | null
  user: any | null
  login: (data: Login) => Promise<void>
  register: (data: Register) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [user, setUser] = useState<any | null>(null)

  const login = async (data: Login) => {
    const headers = {
      'Content-Type': 'application/json',
    }

    const response = await axios.post(`${AUTH_URL}/login`, data, { headers })

    setToken(response.data.token)
    setUser(response.data.user)
    localStorage.setItem('token', response.data.token)
  }

  const register = async (data: Register) => {
    const headers = {
      'Content-Type': 'application/json',
    }

    const response = await axios.post(`${AUTH_URL}/register`, data, { headers })

    setToken(response.data.token)
    setUser(response.data.user)
    localStorage.setItem('token', response.data.token)
  }

  const logout = async () => {
    await axios.post(
      `${AUTH_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    setToken(null)
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    if (token) {
      axios
        .get(`${AUTH_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          console.error('Failed to fetch user data:', error)
          setUser(null)
        })
    }
  }, [token])

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider
      value={{ token, user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
