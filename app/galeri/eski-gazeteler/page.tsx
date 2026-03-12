'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Newspaper, Calendar, ExternalLink } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import clsx from 'clsx'

const newspapers = [
  {
    id: 1, category: 'local',
    title: 'Elmalı\'da Büyük Kazı Başladı', titleEn: 'Major Excavation Begins in Elmalı',
    paper: 'Antalya Postası', date: '14 Temmuz 1987', dateEn: 'July 14, 1987',
    desc: 'Elmalı ovasında başlatılan ilk sistematik arkeolojik kazı çalışmalarını haber yapan yerel gazete.',
    descEn: 'Local newspaper reporting on the first systematic archaeological excavations started in the Elmalı plain.',
  },
  {
    id: 2, category: 'national',
    title: 'Anadolu\'nun Saklı Hazinesi Gün Yüzüne Çıkıyor', titleEn: 'Anatolia\'s Hidden Treasure Comes to Light',
    paper: 'Cumhuriyet', date: '3 Ağustos 1991', dateEn: 'August 3, 1991',
    desc: 'Elmalı kazılarında bulunan Tunç Çağı eserlerini ve proje ekibini tanıtan ulusal gazete haberi.',
    descEn: 'National newspaper story introducing Bronze Age artifacts found in Elmalı excavations and the project team.',
  },
  {
    id: 3, category: 'local',
    title: 'Yayla Geleneği Belgeleniyor', titleEn: 'Plateau Tradition Being Documented',
    paper: 'Elmalı Haber', date: '22 Haziran 2001', dateEn: 'June 22, 2001',
    desc: 'Yaylacılık kültürünün etnografik belgelenmesini ele alan yerel gazete röportajı.',
    descEn: 'Local newspaper interview covering the ethnographic documentation of pastoral culture.',
  },
  {
    id: 4, category: 'national',
    title: 'Arkeologlar Elmalı\'da Tarihi Yeniden Yazıyor', titleEn: 'Archaeologists Rewrite History in Elmalı',
    paper: 'Milliyet', date: '9 Eylül 2005', dateEn: 'September 9, 2005',
    desc: 'Demir Çağı bulgularının bölge tarihini nasıl değiştirdiğini anlatan kapsamlı gazete dosyası.',
    descEn: 'Comprehensive newspaper feature explaining how Iron Age findings are changing the regional history.',
  },
  {
    id: 5, category: 'foreign',
    title: 'Ancient Pastoral Routes Uncovered in Turkey',
    titleEn: 'Ancient Pastoral Routes Uncovered in Turkey',
    paper: 'The Times', date: '17 March 2010', dateEn: 'March 17, 2010',
    desc: 'Elmalı\'daki araştırmaları uluslararası kamuoyuna tanıtan İngilizce gazete haberi.',
    descEn: 'English-language newspaper article introducing the Elmalı research to the international public.',
  },
  {
    id: 6, category: 'local',
    title: 'UNESCO Listesi için Başvuru Hazırlığı', titleEn: 'Preparation for UNESCO List Application',
    paper: 'Elmalı Haber', date: '5 Ocak 2018', dateEn: 'January 5, 2018',
    desc: 'Bölgenin UNESCO Dünya Mirası listesine alınması için yapılan çalışmaları aktaran haber.',
    descEn: 'News report on efforts to have the region included on the UNESCO World Heritage List.',
  },
  {
    id: 7, category: 'national',
    title: 'Dijital Arkeoloji: Elmalı Modeli', titleEn: 'Digital Archaeology: The Elmalı Model',
    paper: 'Hürriyet', date: '28 Mart 2022', dateEn: 'March 28, 2022',
    desc: 'Projenin dijital dokümantasyon yöntemlerini öne çıkaran teknoloji eki haberi.',
    descEn: 'Technology supplement story highlighting the project\'s digital documentation methods.',
  },
]

const catLabels: Record<string, { tr: string; en: string }> = {
  local:    { tr: 'Yerel Basın', en: 'Local Press' },
  national: { tr: 'Ulusal Basın', en: 'National Press' },
  foreign:  { tr: 'Yabancı Basın', en: 'Foreign Press' },
}

const catColors: Record<string, string> = {
  local:    'bg-emerald-50 text-emerald-700',
  national: 'bg-blue-50 text-blue-700',
  foreign:  'bg-purple-50 text-purple-700',
}

export default function EskiGazetelerPage() {
  const { locale } = useI18n()
  const [category, setCategory] = useState('all')

  const categories = [
    { key: 'all',      label: locale === 'tr' ? 'Tümü' : 'All' },
    { key: 'local',    label: locale === 'tr' ? 'Yerel Basın' : 'Local Press' },
    { key: 'national', label: locale === 'tr' ? 'Ulusal Basın' : 'National Press' },
    { key: 'foreign',  label: locale === 'tr' ? 'Yabancı Basın' : 'Foreign Press' },
  ]

  const filtered = category === 'all' ? newspapers : newspapers.filter(n => n.category === category)

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      <div className="bg-obsidian px-4 py-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <Link href="/galeri" className="flex items-center gap-1.5 text-sand/50 hover:text-sand text-xs mb-4 transition-colors w-fit">
            <ArrowLeft size={13} /> {locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}
          </Link>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}</p>
          <h1 className="font-serif text-white text-3xl font-bold">{locale === 'tr' ? 'Eski Gazeteler' : 'Old Newspapers'}</h1>
          <p className="text-sand/60 mt-1 text-sm">{newspapers.length} {locale === 'tr' ? 'gazete küpürü' : 'newspaper clippings'}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
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

        <div className="space-y-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-white border border-sand/70 rounded-sm p-5 hover:border-gold/40 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-parchment-dark border border-sand/60 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Newspaper size={18} className="text-stone" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-serif font-semibold text-obsidian text-sm leading-snug">
                      {locale === 'tr' ? item.title : item.titleEn}
                    </h3>
                    <span className={clsx('text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0', catColors[item.category])}>
                      {locale === 'tr' ? catLabels[item.category]?.tr : catLabels[item.category]?.en}
                    </span>
                  </div>
                  <p className="text-stone text-xs leading-relaxed mb-3">{locale === 'tr' ? item.desc : item.descEn}</p>
                  <div className="flex items-center justify-between text-xs text-stone/60 border-t border-sand/50 pt-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-obsidian">{item.paper}</span>
                      <span className="flex items-center gap-1"><Calendar size={10} />{locale === 'tr' ? item.date : item.dateEn}</span>
                    </div>
                    <button className="flex items-center gap-1 text-gold font-medium hover:text-gold/80 transition-colors">
                      <ExternalLink size={12} /> {locale === 'tr' ? 'Görüntüle' : 'View'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
