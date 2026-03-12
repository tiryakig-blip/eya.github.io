'use client'

import Link from 'next/link'
import { Camera, Film, Map, Newspaper, Mic, ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const sections = [
  {
    href: '/galeri/fotograflar',
    icon: Camera,
    color: 'bg-terra',
    tr: { title: 'Fotoğraflar', desc: 'Kazı alanları ve buluntuların yüksek çözünürlüklü fotoğraf arşivi.' },
    en: { title: 'Photographs', desc: 'High-resolution photo archive of excavation sites and findings.' },
  },
  {
    href: '/galeri/videolar',
    icon: Film,
    color: 'bg-stone-700',
    tr: { title: 'Videolar', desc: 'Araştırma belgeselleri, saha kayıtları ve konferans sunumları.' },
    en: { title: 'Videos', desc: 'Research documentaries, field recordings, and conference presentations.' },
  },
  {
    href: '/galeri/haritalar',
    icon: Map,
    color: 'bg-emerald-700',
    tr: { title: 'Haritalar', desc: 'Bölgeye ait tarihi ve güncel haritalar, kadastro ve topografik planlar.' },
    en: { title: 'Maps', desc: 'Historical and current maps, cadastral and topographic plans of the region.' },
  },
  {
    href: '/galeri/eski-gazeteler',
    icon: Newspaper,
    color: 'bg-gold',
    tr: { title: 'Eski Gazeteler', desc: 'Bölgeyle ilgili tarihi gazete küpürleri ve basın arşivi.' },
    en: { title: 'Old Newspapers', desc: 'Historical newspaper clippings and press archive related to the region.' },
  },
  {
    href: '/galeri/sozlu-tarih',
    icon: Mic,
    color: 'bg-rose-700',
    tr: { title: 'Sözlü Tarih Görüşmeleri', desc: 'Yayla sakinleri ve yerel halkla gerçekleştirilen sözlü tarih görüşmelerinin ses ve video kayıtları.' },
    en: { title: 'Oral History Interviews', desc: 'Audio and video recordings of oral history interviews conducted with plateau inhabitants and local people.' },
  },
]

export default function GaleriPage() {
  const { t, locale } = useI18n()

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-obsidian px-4 py-12 text-center border-b border-white/10">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
          {locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}
        </p>
        <h1 className="font-serif text-white text-3xl md:text-4xl font-bold">{t.gallery.title}</h1>
        <p className="text-sand/60 mt-2 text-sm">{t.gallery.subtitle}</p>
      </div>

      {/* Sub-section cards */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sections.map(({ href, icon: Icon, color, tr, en }) => {
            const content = locale === 'tr' ? tr : en
            return (
              <Link key={href} href={href} className="group block">
                <div className="card-hover bg-white border border-sand/60 rounded-sm p-8 h-full hover:border-gold/40">
                  <div className={`w-14 h-14 ${color} rounded-sm flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-obsidian mb-2 group-hover:text-gold transition-colors">
                    {content.title}
                  </h2>
                  <p className="text-stone text-sm leading-relaxed mb-5">{content.desc}</p>
                  <span className="flex items-center gap-1 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {locale === 'tr' ? 'Görüntüle' : 'View'} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
