'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { Play, X, Clock, Calendar, ArrowLeft } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { videos } from '@/lib/mockData'
import clsx from 'clsx'

const categoryColors: Record<string, string> = {
  documentary: 'bg-blue-900/40 text-blue-400 border-blue-800',
  field:       'bg-emerald-900/40 text-emerald-400 border-emerald-800',
  conference:  'bg-purple-900/40 text-purple-400 border-purple-800',
  education:   'bg-amber-900/40 text-amber-400 border-amber-800',
}

function VideoModal({ video, locale, onClose }: { video: typeof videos[0]; locale: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-3xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-white font-serif font-semibold">{locale === 'tr' ? video.title : video.titleEn}</h2>
            <p className="text-sand/50 text-xs mt-0.5">{video.year} · {video.duration}</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white p-1"><X size={20} /></button>
        </div>
        <div className="relative aspect-video bg-black rounded-sm overflow-hidden">
          <iframe src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen className="absolute inset-0 w-full h-full" />
        </div>
        <p className="text-sand/60 text-sm leading-relaxed mt-3 px-1">{locale === 'tr' ? video.description : video.descriptionEn}</p>
      </div>
    </div>
  )
}

export default function VideolarPage() {
  const { locale } = useI18n()
  const [category, setCategory] = useState('all')
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null)

  const catLabels: Record<string, { tr: string; en: string }> = {
    documentary: { tr: 'Belgesel', en: 'Documentary' },
    field:       { tr: 'Saha Kaydı', en: 'Field Recording' },
    conference:  { tr: 'Konferans', en: 'Conference' },
    education:   { tr: 'Eğitim', en: 'Education' },
  }

  const categories = [
    { key: 'all',         label: locale === 'tr' ? 'Tümü' : 'All' },
    { key: 'documentary', label: locale === 'tr' ? 'Belgesel' : 'Documentary' },
    { key: 'field',       label: locale === 'tr' ? 'Saha Kaydı' : 'Field Recording' },
    { key: 'conference',  label: locale === 'tr' ? 'Konferans' : 'Conference' },
    { key: 'education',   label: locale === 'tr' ? 'Eğitim' : 'Education' },
  ]

  const filtered = useMemo(() =>
    category === 'all' ? videos : videos.filter(v => v.category === category),
    [category]
  )

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      <div className="bg-obsidian px-4 py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <Link href="/galeri" className="flex items-center gap-1.5 text-sand/50 hover:text-sand text-xs mb-4 transition-colors w-fit">
            <ArrowLeft size={13} /> {locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}
          </Link>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}</p>
          <h1 className="font-serif text-white text-3xl font-bold">{locale === 'tr' ? 'Videolar' : 'Videos'}</h1>
          <p className="text-sand/60 mt-1 text-sm">{videos.length} {locale === 'tr' ? 'video' : 'videos'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured */}
        <div className="mb-10">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">{locale === 'tr' ? 'Öne Çıkan' : 'Featured'}</p>
          <div className="relative rounded-sm overflow-hidden cursor-pointer group" onClick={() => setActiveVideo(videos[0])}>
            <div className="relative aspect-video max-h-[400px]">
              <Image src={videos[0].thumbnail} alt={locale === 'tr' ? videos[0].title : videos[0].titleEn} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/55 transition-colors flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gold/90 group-hover:bg-gold rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 mb-4">
                  <Play size={32} className="text-white ml-1.5" fill="white" />
                </div>
                <h2 className="font-serif text-white text-xl font-bold text-center px-4 max-w-xl">{locale === 'tr' ? videos[0].title : videos[0].titleEn}</h2>
                <p className="text-sand/70 text-sm mt-2">{videos[0].year} · {videos[0].duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(({ key, label }) => (
            <button key={key} onClick={() => setCategory(key)}
              className={clsx('px-4 py-1.5 text-sm rounded-sm border transition-all duration-200',
                category === key ? 'bg-obsidian text-white border-obsidian' : 'bg-white text-stone border-sand/70 hover:border-stone hover:text-obsidian'
              )}>
              {label}
              {key !== 'all' && <span className="ml-1.5 text-[10px] opacity-50">({videos.filter(v => v.category === key).length})</span>}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(video => (
            <div key={video.id} className="card-hover bg-white border border-sand/70 rounded-sm overflow-hidden group cursor-pointer" onClick={() => setActiveVideo(video)}>
              <div className="relative aspect-video overflow-hidden">
                <Image src={video.thumbnail} alt={locale === 'tr' ? video.title : video.titleEn} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-obsidian/30 group-hover:bg-obsidian/50 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-gold/90 group-hover:bg-gold rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <Play size={22} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-obsidian/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">{video.duration}</div>
                <div className="absolute top-2 left-2">
                  <span className={clsx('text-[10px] px-2 py-0.5 rounded-full border', categoryColors[video.category])}>
                    {locale === 'tr' ? catLabels[video.category]?.tr : catLabels[video.category]?.en}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-obsidian text-sm font-semibold leading-snug mb-1 group-hover:text-gold transition-colors line-clamp-2">{locale === 'tr' ? video.title : video.titleEn}</h3>
                <p className="text-stone text-xs line-clamp-2 leading-relaxed">{locale === 'tr' ? video.description : video.descriptionEn}</p>
                <div className="flex items-center gap-3 mt-3 text-[10px] text-stone/60">
                  <span className="flex items-center gap-1"><Calendar size={10} />{video.year}</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{video.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && <VideoModal video={activeVideo} locale={locale} onClose={() => setActiveVideo(null)} />}
    </div>
  )
}
