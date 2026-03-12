'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { translations, type Locale, type Translations } from './translations'

interface I18nContextType {
  locale: Locale
  t: Translations
  setLocale: (l: Locale) => void
  toggle: () => void
}

const I18nContext = createContext<I18nContextType>({
  locale: 'tr',
  t: translations.tr,
  setLocale: () => {},
  toggle: () => {},
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('tr')

  const setLocale = useCallback((l: Locale) => setLocaleState(l), [])
  const toggle = useCallback(() => setLocaleState(prev => prev === 'tr' ? 'en' : 'tr'), [])

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale, toggle }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
