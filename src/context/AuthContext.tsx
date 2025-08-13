import axios from 'axios'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Register } from 'react-router'
import type { Login } from '../models/Auth'
import { AUTH_URL } from '../utils/urls'

interface AuthContextType {
  token: string | null
  user: any | null
  login: <T = Login>(data: T) => Promise<void>
  register: <T = Register>(data: T) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  )
  const [user, setUser] = useState<any | null>(() => {
    const userStr = localStorage.getItem('user')
    return userStr ? userStr : null
  })

  const login = async <T = Login,>(data: T): Promise<void> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const response = await axios.post(`${AUTH_URL}/login`, data, { headers })

    setToken(response.data.token)
    setUser(response.data.user)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', response.data.user)

    return response.data
  }

  const register = async <T = Register,>(data: T): Promise<void> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const response = await axios.post(`${AUTH_URL}/register`, data, { headers })

    setToken(response.data.token)
    setUser(response.data.user)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', response.data.user)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

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
