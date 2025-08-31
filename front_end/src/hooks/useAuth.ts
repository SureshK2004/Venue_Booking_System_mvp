"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface User {
  id: string
  name: string
  email: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true })
        setUser(res.data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    const res = await axios.post(
      "/api/auth/login",
      { email, password },
      { withCredentials: true }
    )
    setUser(res.data.user)
  }

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true })
    setUser(null)
  }

  return { user, loading, login, logout }
}
