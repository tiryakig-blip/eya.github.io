'use client'

import { useEffect, useState } from 'react'

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch('/api/auth/check')
      .then(r => r.json())
      .then(data => setIsAdmin(data.isAdmin))
      .catch(() => setIsAdmin(false))
  }, [])

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    setIsAdmin(false)
    window.location.reload()
  }

  return { isAdmin, logout }
}
