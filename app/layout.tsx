import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Elmalı Kültür Envanteri Projesi',
  description: 'Elmalı kültür envanteri projesi — harita, belgeler, galeri ve video arşivi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col">
        <I18nProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
