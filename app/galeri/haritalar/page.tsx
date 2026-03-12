'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Download, MapPin, Calendar } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import clsx from 'clsx'

const maps = [
  {
    id: 1, category: 'topographic',
    title: 'Elmalı Havzası Topografik Harita', titleEn: 'Elmalı Basin Topographic Map',
    year: 1975, source: 'Harita Genel Müdürlüğü', scale: '1:25.000',
    region: 'Elmalı Havzası', desc: 'Bölgenin 1975 yılına ait 1:25.000 ölçekli topografik haritası.',
    descEn: '1:25,000 scale topographic map of the region from 1975.',
  },
  {
    id: 2, category: 'cadastral',
    title: 'Elmalı Yaylası Kadastro Paftası', titleEn: 'Elmalı Plateau Cadastral Map',
    year: 1962, source: 'Tapu ve Kadastro Genel Müdürlüğü', scale: '1:5.000',
    region: 'Elmalı Yaylası', desc: '1962 tarihli yayla arazilerine ait kadastro paftası.',
    descEn: 'Cadastral map of plateau lands dated 1962.',
  },
  {
    id: 3, category: 'historical',
    title: 'Osmanlı Dönemi Yol Haritası', titleEn: 'Ottoman Period Road Map',
    year: 1890, source: 'Osmanlı Arşivi', scale: 'Belirtilmemiş',
    region: 'Güney Anadolu', desc: 'Güney Anadolu\'nun Osmanlı dönemine ait eski yol ve yerleşim haritası.',
    descEn: 'Old road and settlement map of Southern Anatolia from the Ottoman period.',
  },
  {
    id: 4, category: 'archaeological',
    title: 'Kazı Alanları Vaziyet Planı 2023', titleEn: 'Excavation Sites Site Plan 2023',
    year: 2023, source: 'Araştırma Ekibi', scale: '1:1.000',
    region: 'Kazı Bölgesi', desc: 'Tüm aktif ve tamamlanmış kazı sektörlerinin güncel vaziyet planı.',
    descEn: 'Current site plan of all active and completed excavation sectors.',
  },
  {
    id: 5, category: 'historical',
    title: 'Fransız Askeri Haritası', titleEn: 'French Military Map',
    year: 1917, source: 'Bibliothèque nationale de France', scale: '1:200.000',
    region: 'Anadolu', desc: 'I. Dünya Savaşı dönemine ait Fransız askeri haritası.',
    descEn: 'French military map from the World War I period.',
  },
  {
    id: 6, category: 'topographic',
    title: 'SRTM Sayısal Yükseklik Modeli', titleEn: 'SRTM Digital Elevation Model',
    year: 2000, source: 'NASA / USGS', scale: '30m çözünürlük',
    region: 'Elmalı Bölgesi', desc: 'Elmalı bölgesinin NASA SRTM verisinden üretilmiş sayısal yükseklik modeli.',
    descEn: 'Digital elevation model of the Elmalı region produced from NASA SRTM data.',
  },
]

const catLabels: Record<string, { tr: string; en: string }> = {
  topographic:   { tr: 'Topografik', en: 'Topographic' },
  cadastral:     { tr: 'Kadastro', en: 'Cadastral' },
  historical:    { tr: 'Tarihi', en: 'Historical' },
  archaeological:{ tr: 'Arkeolojik', en: 'Archaeological' },
}

export default function HaritalarPage() {
  const { locale } = useI18n()
  const [category, setCategory] = useState('all')

  const categories = [
    { key: 'all',           label: locale === 'tr' ? 'Tümü' : 'All' },
    { key: 'topographic',   label: locale === 'tr' ? 'Topografik' : 'Topographic' },
    { key: 'cadastral',     label: locale === 'tr' ? 'Kadastro' : 'Cadastral' },
    { key: 'historical',    label: locale === 'tr' ? 'Tarihi' : 'Historical' },
    { key: 'archaeological',label: locale === 'tr' ? 'Arkeolojik' : 'Archaeological' },
  ]

  const filtered = category === 'all' ? maps : maps.filter(m => m.category === category)

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      <div className="bg-obsidian px-4 py-10 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Link href="/galeri" className="flex items-center gap-1.5 text-sand/50 hover:text-sand text-xs mb-4 transition-colors w-fit">
            <ArrowLeft size={13} /> {locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}
          </Link>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}</p>
          <h1 className="font-serif text-white text-3xl font-bold">{locale === 'tr' ? 'Haritalar' : 'Maps'}</h1>
          <p className="text-sand/60 mt-1 text-sm">{maps.length} {locale === 'tr' ? 'harita ve plan' : 'maps and plans'}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(({ key, label }) => (
            <button key={key} onClick={() => setCategory(key)}
              className={clsx('px-4 py-1.5 text-sm rounded-sm border transition-all duration-200',
                category === key ? 'bg-obsidian text-white border-obsidian' : 'bg-white text-stone border-sand/70 hover:border-stone hover:text-obsidian'
              )}>
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(map => (
            <div key={map.id} className="bg-white border border-sand/70 rounded-sm p-5 hover:border-gold/40 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-obsidian text-sm leading-snug">{locale === 'tr' ? map.title : map.titleEn}</h3>
                <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                  {locale === 'tr' ? catLabels[map.category]?.tr : catLabels[map.category]?.en}
                </span>
              </div>
              <p className="text-stone text-xs leading-relaxed mb-3">{locale === 'tr' ? map.desc : map.descEn}</p>
              <div className="flex items-center justify-between text-xs text-stone/60 border-t border-sand/50 pt-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Calendar size={10} />{map.year}</span>
                  <span className="flex items-center gap-1"><MapPin size={10} />{map.region}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono">{map.scale}</span>
                  <button className="flex items-center gap-1 text-gold font-medium hover:text-gold/80 transition-colors">
                    <Download size={12} /> {locale === 'tr' ? 'İndir' : 'Download'}
                  </button>
                </div>
              </div>
              <p className="text-stone/40 text-[10px] mt-2">{locale === 'tr' ? 'Kaynak' : 'Source'}: {map.source}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
