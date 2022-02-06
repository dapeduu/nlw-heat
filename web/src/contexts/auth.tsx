import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

interface AuthProvider {
  children: ReactNode
}

interface User {
  id: string
  name: string
  login: string
  avatar_url: string
}

interface AuthResponse {
  token: string
  user: User
}

interface AuthContextData {
  user: User | null
  signInUrl: string
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)
  const signInUrl = ' http://localhost:3001/github'

  async function signIn(code: string) {
    const {
      data: { token, user },
    } = await api.post<AuthResponse>('/authenticate', { code })

    localStorage.setItem('@nlw:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('@nlw:token')
  }

  async function getProfile() {
    const token = localStorage.getItem('@nlw:token')

    api.defaults.headers.common.authorization = `Bearer ${token}`

    if (token) {
      const { data: user } = await api.get<User>('/profile', {})

      setUser(user)
    }
  }

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, code] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutCode)
      signIn(code)
    }
  }, [])

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
