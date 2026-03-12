'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import clsx from 'clsx'

export default function Header() {
  const { t, locale, toggle } = useI18n()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: '/',          label: t.nav.home },
    { href: '/harita',    label: t.nav.map },
    { href: '/belgeler',  label: t.nav.documents },
    { href: '/galeri',    label: t.nav.gallery },
    { href: '/sayisal-kutuphane', label: t.nav.library },
    { href: '/hakkinda',          label: t.nav.about },
  ]

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
        scrolled
          ? 'bg-obsidian/95 backdrop-blur-md shadow-lg shadow-black/20 py-3'
          : 'bg-gradient-to-b from-obsidian/80 to-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gold rounded-sm flex items-center justify-center group-hover:bg-gold-dark transition-colors relative overflow-hidden">
            <Image src="/logo.png" alt="Logo" fill className="object-contain p-1 brightness-0 invert" />
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-serif text-sm font-semibold leading-tight tracking-wide">
              {locale === 'tr' ? 'Elmalı Kültür Envanteri' : 'Elmali Cultural Inventory'}
            </p>
            <p className="text-sand/60 text-[10px] tracking-[0.2em] uppercase">
              {locale === 'tr' ? 'Projesi' : 'Project'}
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx('nav-link', pathname === href && 'active')}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side: Lang toggle + mobile menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 text-sand/70 hover:text-white transition-colors text-sm px-3 py-1.5 border border-white/15 rounded-sm hover:border-white/30"
          >
            <Globe size={14} />
            <span className="font-medium tracking-wider">{locale.toUpperCase()}</span>
            <ChevronDown size={12} />
          </button>

          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-obsidian border-t border-white/10 animate-fade-in">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'px-3 py-2.5 rounded text-sm transition-colors',
                  pathname === href
                    ? 'bg-gold/10 text-gold'
                    : 'text-sand/70 hover:text-white hover:bg-white/5'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
