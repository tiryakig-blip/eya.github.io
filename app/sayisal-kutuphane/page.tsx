'use client'

import { useState, useMemo } from 'react'
import { BookOpen, Database, Map, Archive, Download, Lock, ExternalLink, Search } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import clsx from 'clsx'

const resources = [
  {
    id: 1, category: 'ebook',
    title: 'Elmalı Yaylası Arkeolojik Rehberi',
    titleEn: 'Archaeological Guide of Elmalı Plateau',
    author: 'Prof. Dr. Ayşe Kaya',
    year: 2023, size: '12.4 MB', format: 'PDF', openAccess: true,
    desc: 'Elmalı yaylasındaki arkeolojik alanları tanıtan kapsamlı rehber.',
    descEn: 'Comprehensive guide introducing archaeological sites on the Elmalı plateau.',
  },
  {
    id: 2, category: 'dataset',
    title: 'Buluntu Koordinatları Veri Seti 2018–2023',
    titleEn: 'Finding Coordinates Dataset 2018–2023',
    author: 'Araştırma Ekibi',
    year: 2023, size: '3.1 MB', format: 'CSV', openAccess: true,
    desc: 'Tüm kayıtlı buluntu noktalarının CBS uyumlu koordinat verisi.',
    descEn: 'GIS-compatible coordinate data for all registered finding points.',
  },
  {
    id: 3, category: 'map',
    title: 'Elmalı Havzası Topografik Harita',
    titleEn: 'Elmalı Basin Topographic Map',
    author: 'Dr. Ali Çelik',
    year: 2022, size: '45.2 MB', format: 'GeoTIFF', openAccess: false,
    desc: '1:25.000 ölçekli sayısal topografik harita.',
    descEn: '1:25,000 scale digital topographic map.',
  },
  {
    id: 4, category: 'archive',
    title: 'Osmanlı Dönemi Arazi Kayıtları',
    titleEn: 'Ottoman Period Land Records',
    author: 'Dr. Zeynep Başaran',
    year: 2021, size: '8.7 MB', format: 'PDF', openAccess: true,
    desc: 'Elmalı bölgesine ait Osmanlı dönemi tapu ve arazi kayıtlarının dijital arşivi.',
    descEn: 'Digital archive of Ottoman period title deed and land records for the Elmalı region.',
  },
  {
    id: 5, category: 'ebook',
    title: 'Yaylacılık Kültürü: Etnografik Derleme',
    titleEn: 'Pastoral Culture: Ethnographic Collection',
    author: 'Prof. Dr. Hasan Özkan',
    year: 2022, size: '18.9 MB', format: 'PDF', openAccess: false,
    desc: 'Akdeniz Alpleri\'nde yaylacılık geleneğine ait sözlü tarih ve etnografik belgeler.',
    descEn: 'Oral history and ethnographic documents on pastoral tradition in the Mediterranean Alps.',
  },
  {
    id: 6, category: 'dataset',
    title: 'İklim & Çevre Verileri 2015–2023',
    titleEn: 'Climate & Environment Data 2015–2023',
    author: 'Dr. Burak Aydın',
    year: 2023, size: '5.6 MB', format: 'XLSX', openAccess: true,
    desc: 'Kazı sezonu boyunca kaydedilen iklim, nem ve çevre gözlem verileri.',
    descEn: 'Climate, humidity, and environmental observation data recorded during excavation seasons.',
  },
  {
    id: 7, category: 'map',
    title: 'Kazı Alanları Vaziyet Planı',
    titleEn: 'Excavation Sites Site Plan',
    author: 'Dr. Mehmet Demir',
    year: 2023, size: '22.1 MB', format: 'DWG', openAccess: false,
    desc: 'Tüm kazı sektörlerinin ölçekli mimari çizim ve planları.',
    descEn: 'Scaled architectural drawings and plans of all excavation sectors.',
  },
  {
    id: 8, category: 'archive',
    title: 'Fotoğraf Negatif Arşivi 1987–2005',
    titleEn: 'Photo Negative Archive 1987–2005',
    author: 'Araştırma Ekibi',
    year: 2020, size: '2.3 GB', format: 'TIFF', openAccess: true,
    desc: 'Dijitalleştirilmiş analog fotoğraf negatifleri, erken dönem araştırmaları.',
    descEn: 'Digitized analog photo negatives from early period research.',
  },
]

const categoryIcons: Record<string, React.ElementType> = {
  ebook: BookOpen,
  dataset: Database,
  map: Map,
  archive: Archive,
}

export default function SayisalKutuphane() {
  const { t, locale } = useI18n()
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  const lib = t.library

  const categories = [
    { key: 'all',     label: lib.categories.all },
    { key: 'ebook',   label: lib.categories.ebook },
    { key: 'dataset', label: lib.categories.dataset },
    { key: 'map',     label: lib.categories.map },
    { key: 'archive', label: lib.categories.archive },
  ]

  const filtered = useMemo(() => {
    return resources.filter(r => {
      const matchCat = category === 'all' || r.category === category
      const q = search.toLowerCase()
      const matchQ = !q ||
        r.title.toLowerCase().includes(q) ||
        r.titleEn.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [category, search])

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-obsidian px-4 py-12 text-center border-b border-white/10">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
          {locale === 'tr' ? 'Dijital Kaynaklar' : 'Digital Resources'}
        </p>
        <h1 className="font-serif text-white text-3xl md:text-4xl font-bold">{lib.title}</h1>
        <p className="text-sand/60 mt-2 text-sm">{lib.subtitle}</p>
        <p className="text-sand/30 text-xs mt-2">{resources.length} {locale === 'tr' ? 'kaynak' : 'resources'}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50" />
          <input
            type="text"
            placeholder={lib.search}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-sand/70 rounded-sm bg-white text-obsidian text-sm focus:outline-none focus:border-gold"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={clsx(
                'px-4 py-1.5 text-sm rounded-sm border transition-all duration-200',
                category === key
                  ? 'bg-obsidian text-white border-obsidian'
                  : 'bg-white text-stone border-sand/70 hover:border-stone hover:text-obsidian'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Resource list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(r => {
            const Icon = categoryIcons[r.category] ?? BookOpen
            return (
              <div key={r.id} className="bg-white border border-sand/70 rounded-sm p-5 hover:border-gold/40 hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-obsidian text-sm leading-snug">
                        {locale === 'tr' ? r.title : r.titleEn}
                      </h3>
                      <span className={clsx(
                        'text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 flex items-center gap-1',
                        r.openAccess
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-stone/10 text-stone'
                      )}>
                        {r.openAccess ? null : <Lock size={9} />}
                        {r.openAccess ? lib.openAccess : lib.restricted}
                      </span>
                    </div>
                    <p className="text-stone text-xs mb-2">{locale === 'tr' ? r.desc : r.descEn}</p>
                    <div className="flex items-center justify-between text-xs text-stone/60 border-t border-sand/50 pt-2 mt-2">
                      <span>{r.author} · {r.year}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono">{r.format} · {r.size}</span>
                        {r.openAccess ? (
                          <button className="flex items-center gap-1 text-gold font-medium hover:text-gold/80 transition-colors">
                            <Download size={12} /> {lib.download}
                          </button>
                        ) : (
                          <button className="flex items-center gap-1 text-stone/50 font-medium cursor-not-allowed">
                            <ExternalLink size={12} /> {lib.access}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-stone">
            <p>{lib.noResults}</p>
          </div>
        )}
      </div>
    </div>
  )
}
