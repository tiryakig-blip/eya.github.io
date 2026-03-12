'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { locale } = useI18n()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <div className="pt-16 min-h-screen bg-parchment flex items-center justify-center px-4">
      <div className="bg-white border border-sand/60 rounded-sm p-8 w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Lock size={20} className="text-gold" />
          <h1 className="font-serif text-obsidian text-xl font-bold">
            {locale === 'tr' ? 'Yetkili Girişi' : 'Admin Login'}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={locale === 'tr' ? 'Şifre' : 'Password'}
            className="w-full px-4 py-3 border border-sand/60 rounded-sm text-sm focus:outline-none focus:border-gold transition-colors mb-3"
            autoFocus
          />

          {error && (
            <p className="text-red-500 text-xs mb-3">
              {locale === 'tr' ? 'Hatalı şifre.' : 'Wrong password.'}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-obsidian text-white py-3 rounded-sm text-sm font-medium hover:bg-obsidian/90 transition-colors disabled:opacity-50"
          >
            {loading
              ? (locale === 'tr' ? 'Giriş yapılıyor...' : 'Logging in...')
              : (locale === 'tr' ? 'Giriş Yap' : 'Login')
            }
          </button>
        </form>
      </div>
    </div>
  )
}
