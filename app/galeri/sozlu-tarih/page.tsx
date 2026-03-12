'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Mic, Play, Clock, Calendar, MapPin } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import clsx from 'clsx'

const interviews = [
  {
    id: 1, category: 'audio',
    name: 'Ahmet Kaya (78)', nameEn: 'Ahmet Kaya (78)',
    title: 'Çoban Yolu ve Yayla Geleneği', titleEn: 'Shepherd\'s Route and Plateau Tradition',
    location: 'Elmalı Yaylası', date: '2019-08-12', duration: '48:32',
    desc: 'Elli yılı aşkın çobanlık deneyimiyle Ahmet Kaya, geleneksel göç yollarını ve yayla yaşamını aktarıyor.',
    descEn: 'With over fifty years of shepherding experience, Ahmet Kaya describes traditional migration routes and plateau life.',
  },
  {
    id: 2, category: 'video',
    name: 'Fatma Yıldırım (65)', nameEn: 'Fatma Yıldırım (65)',
    title: 'Yaylada Gündelik Yaşam ve Geleneksel El Sanatları', titleEn: 'Daily Life on the Plateau and Traditional Crafts',
    location: 'Söğütcük Yaylası', date: '2020-07-04', duration: '1:12:15',
    desc: 'Geleneksel dokumacılık ve yayladaki gündelik yaşam pratikleri üzerine kapsamlı bir görüşme.',
    descEn: 'A comprehensive interview on traditional weaving and daily life practices on the plateau.',
  },
  {
    id: 3, category: 'audio',
    name: 'Mustafa Demir (83)', nameEn: 'Mustafa Demir (83)',
    title: 'Eski Köy Yerleri ve Unutulan Mekânlar', titleEn: 'Old Village Sites and Forgotten Places',
    location: 'Elmalı Merkez', date: '2018-09-22', duration: '35:10',
    desc: 'Artık terk edilmiş olan eski köy ve mezra yerlerini bizzat gösteren Mustafa Demir\'in tanıklığı.',
    descEn: 'Testimony of Mustafa Demir, who personally shows the locations of old villages and hamlets that have since been abandoned.',
  },
  {
    id: 4, category: 'video',
    name: 'Hatice & Ramazan Çelik (70, 74)', nameEn: 'Hatice & Ramazan Çelik (70, 74)',
    title: 'Yayla Kültüründe Müzik ve Ritüeller', titleEn: 'Music and Rituals in Plateau Culture',
    location: 'Çığlıkara Yaylası', date: '2021-08-01', duration: '55:48',
    desc: 'Yaylaya çıkış törenleri, halk türküleri ve mevsimlik ritüeller üzerine çift görüşmesi.',
    descEn: 'Couple interview on ceremonies marking the ascent to the plateau, folk songs, and seasonal rituals.',
  },
  {
    id: 5, category: 'audio',
    name: 'İbrahim Arslan (71)', nameEn: 'İbrahim Arslan (71)',
    title: 'Hayvancılık Ekonomisi ve Değişen Koşullar', titleEn: 'Livestock Economy and Changing Conditions',
    location: 'Elmalı Yaylası', date: '2022-07-18', duration: '41:27',
    desc: 'Son elli yılda hayvancılık ve yayla ekonomisinde yaşanan dönüşümleri aktaran görüşme.',
    descEn: 'Interview conveying the transformations in livestock farming and plateau economy over the past fifty years.',
  },
  {
    id: 6, category: 'video',
    name: 'Zeynep Kara (58)', nameEn: 'Zeynep Kara (58)',
    title: 'Şifalı Bitkiler ve Geleneksel Hekimlik', titleEn: 'Medicinal Plants and Traditional Medicine',
    location: 'Söğütcük Yaylası', date: '2023-08-09', duration: '1:04:33',
    desc: 'Yaylada yetişen şifalı bitkiler ve eski halk hekimliği pratikleri üzerine ayrıntılı görüşme.',
    descEn: 'Detailed interview on medicinal plants growing on the plateau and old folk medicine practices.',
  },
]

const catLabels: Record<string, { tr: string; en: string }> = {
  audio: { tr: 'Ses Kaydı', en: 'Audio Recording' },
  video: { tr: 'Video Kaydı', en: 'Video Recording' },
}

const catColors: Record<string, string> = {
  audio: 'bg-blue-50 text-blue-700',
  video: 'bg-rose-50 text-rose-700',
}

export default function SozluTarihPage() {
  const { locale } = useI18n()
  const [category, setCategory] = useState('all')

  const categories = [
    { key: 'all',   label: locale === 'tr' ? 'Tümü' : 'All' },
    { key: 'audio', label: locale === 'tr' ? 'Ses Kaydı' : 'Audio' },
    { key: 'video', label: locale === 'tr' ? 'Video Kaydı' : 'Video' },
  ]

  const filtered = category === 'all' ? interviews : interviews.filter(i => i.category === category)

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      <div className="bg-obsidian px-4 py-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <Link href="/galeri" className="flex items-center gap-1.5 text-sand/50 hover:text-sand text-xs mb-4 transition-colors w-fit">
            <ArrowLeft size={13} /> {locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}
          </Link>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}</p>
          <h1 className="font-serif text-white text-3xl font-bold">{locale === 'tr' ? 'Sözlü Tarih Görüşmeleri' : 'Oral History Interviews'}</h1>
          <p className="text-sand/60 mt-1 text-sm">{interviews.length} {locale === 'tr' ? 'görüşme kaydı' : 'interview recordings'}</p>
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
              {key !== 'all' && <span className="ml-1.5 text-[10px] opacity-50">({interviews.filter(i => i.category === key).length})</span>}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-white border border-sand/70 rounded-sm p-5 hover:border-gold/40 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mic size={18} className="text-rose-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="font-serif font-semibold text-obsidian text-sm leading-snug">
                        {locale === 'tr' ? item.title : item.titleEn}
                      </h3>
                      <p className="text-gold text-xs mt-0.5 font-medium">{locale === 'tr' ? item.name : item.nameEn}</p>
                    </div>
                    <span className={clsx('text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0', catColors[item.category])}>
                      {locale === 'tr' ? catLabels[item.category]?.tr : catLabels[item.category]?.en}
                    </span>
                  </div>
                  <p className="text-stone text-xs leading-relaxed mb-3">{locale === 'tr' ? item.desc : item.descEn}</p>
                  <div className="flex items-center justify-between text-xs text-stone/60 border-t border-sand/50 pt-2">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><MapPin size={10} />{item.location}</span>
                      <span className="flex items-center gap-1"><Calendar size={10} />{item.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{item.duration}</span>
                    </div>
                    <button className="flex items-center gap-1 text-gold font-medium hover:text-gold/80 transition-colors">
                      <Play size={12} /> {locale === 'tr' ? 'Dinle / İzle' : 'Listen / Watch'}
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
