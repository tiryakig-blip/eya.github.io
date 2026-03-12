'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'
import { MapPin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const { t, locale } = useI18n()

  return (
    <footer className="bg-obsidian text-sand/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center relative overflow-hidden">
              <Image src="/logo.png" alt="Logo" fill className="object-contain p-1 brightness-0 invert" />
            </div>
            <div>
              <p className="text-white font-serif text-sm font-semibold leading-tight">
                {locale === 'tr' ? 'Elmalı Kültür Envanteri' : 'Elmali Cultural Inventory'}
              </p>
              <p className="text-sand/60 text-[10px] tracking-[0.2em] uppercase">
                {locale === 'tr' ? 'Projesi' : 'Project'}
              </p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-sand/50">
            {locale === 'tr'
              ? "Anadolu'nun tarihi katmanlarını araştıran bilimsel bir proje."
              : "A scientific project researching the historical layers of Anatolia."}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">{locale === 'tr' ? 'Modüller' : 'Modules'}</h4>
          <ul className="space-y-2 text-xs">
            {[
              ['/harita', t.nav.map],
              ['/belgeler', t.nav.documents],
              ['/galeri', t.nav.gallery],
              ['/videolar', t.nav.videos],
              ['/hakkinda', t.nav.about],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-gold transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Institutions */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">{locale === 'tr' ? 'Kurumlar' : 'Institutions'}</h4>
          <ul className="space-y-2 text-xs">
            {['Akdeniz Üniversitesi', 'Antalya Kültürel Miras Derneği (ANKA)', 'Başkent Üniversitesi', 'Çanakkale Onsekiz Mart Üniversitesi', 'Elmalı Belediyesi', 'Elmalı Müze Müdürlüğü', 'Koç Üniversitesi AKMED'].map(i => (
              <li key={i} className="text-sand/50">{i}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">{t.footer.contact}</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2">
              <MapPin size={13} className="mt-0.5 text-gold shrink-0" />
              <span>Akdeniz Üniversitesi, Edebiyat Fakültesi, Arkeoloji Bölümü, 07070 Antalya</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={13} className="text-gold shrink-0" />
              <span>gtiryaki@akdeniz.edu.tr</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={13} className="text-gold shrink-0" />
              <span>+90 242 310 61 93</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-sand/40">
        <span>© {new Date().getFullYear()} Elmalı Kültür Envanteri Projesi. {t.footer.rights}</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-sand transition-colors">{t.footer.privacy}</Link>
          <Link href="#" className="hover:text-sand transition-colors">{t.footer.terms}</Link>
        </div>
      </div>
    </footer>
  )
}
