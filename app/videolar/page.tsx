'use client'

import Image from 'next/image'
import { useState, useMemo } from 'react'
import { Play, X, Clock, Calendar, Tag } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { videos } from '@/lib/mockData'
import clsx from 'clsx'

const categoryColors: Record<string, string> = {
  documentary: 'bg-blue-900/40 text-blue-400 border-blue-800',
  field:       'bg-emerald-900/40 text-emerald-400 border-emerald-800',
  conference:  'bg-purple-900/40 text-purple-400 border-purple-800',
  education:   'bg-amber-900/40 text-amber-400 border-amber-800',
}

// ── Video Modal ───────────────────────────────────────────────────────────────
function VideoModal({ video, locale, t, onClose }: {
  video: typeof videos[0]; locale: string; t: { videos: typeof import('@/lib/translations').translations.tr.videos }; onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lightbox-backdrop bg-obsidian/85 animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-3xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-white font-serif font-semibold">{locale === 'tr' ? video.title : video.titleEn}</h2>
            <p className="text-sand/50 text-xs mt-0.5">{video.year} · {video.duration}</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>

        {/* Embedded YouTube iframe */}
        <div className="relative aspect-video bg-black rounded-sm overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        <div className="mt-3 px-1">
          <p className="text-sand/60 text-sm leading-relaxed">
            {locale === 'tr' ? video.description : video.descriptionEn}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Video Card ────────────────────────────────────────────────────────────────
function VideoCard({ video, locale, t, onClick }: {
  video: typeof videos[0]; locale: string; t: { videos: typeof import('@/lib/translations').translations.tr.videos }; onClick: () => void
}) {
  const catLabel: Record<string, { tr: string; en: string }> = {
    documentary: { tr: 'Belgesel', en: 'Documentary' },
    field:       { tr: 'Saha Kaydı', en: 'Field Recording' },
    conference:  { tr: 'Konferans', en: 'Conference' },
    education:   { tr: 'Eğitim', en: 'Education' },
  }

  return (
    <div className="card-hover bg-white border border-sand/70 rounded-sm overflow-hidden group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={locale === 'tr' ? video.title : video.titleEn}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 bg-obsidian/30 group-hover:bg-obsidian/50 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 bg-gold/90 group-hover:bg-gold rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
            <Play size={22} className="text-white ml-1" fill="white" />
          </div>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-obsidian/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
          {video.duration}
        </div>
        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className={clsx('text-[10px] px-2 py-0.5 rounded-full border', categoryColors[video.category])}>
            {locale === 'tr' ? catLabel[video.category]?.tr : catLabel[video.category]?.en}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-obsidian text-sm font-semibold leading-snug mb-1 group-hover:text-gold transition-colors line-clamp-2">
          {locale === 'tr' ? video.title : video.titleEn}
        </h3>
        <p className="text-stone text-xs line-clamp-2 leading-relaxed">
          {locale === 'tr' ? video.description : video.descriptionEn}
        </p>
        <div className="flex items-center gap-3 mt-3 text-[10px] text-stone/60">
          <span className="flex items-center gap-1"><Calendar size={10} />{video.year}</span>
          <span className="flex items-center gap-1"><Clock size={10} />{video.duration}</span>
        </div>
      </div>
    </div>
  )
}

export default function VideolarPage() {
  const { t, locale } = useI18n()
  const [category, setCategory] = useState('all')
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null)

  const categories = [
    { key: 'all',        label: t.videos.categories.all },
    { key: 'documentary',label: t.videos.categories.documentary },
    { key: 'field',      label: t.videos.categories.field },
    { key: 'conference', label: t.videos.categories.conference },
    { key: 'education',  label: t.videos.categories.education },
  ]

  const filtered = useMemo(() =>
    category === 'all' ? videos : videos.filter(v => v.category === category),
    [category]
  )

  const featuredVideo = videos[0]

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-obsidian px-4 py-12 text-center border-b border-white/10">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{locale === 'tr' ? 'Video Arşivi' : 'Video Archive'}</p>
        <h1 className="font-serif text-white text-3xl md:text-4xl font-bold">{t.videos.title}</h1>
        <p className="text-sand/60 mt-2 text-sm">{t.videos.subtitle}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Featured Video */}
        <div className="mb-12">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">{t.videos.featured}</p>
          <div
            className="relative rounded-sm overflow-hidden cursor-pointer group"
            onClick={() => setActiveVideo(featuredVideo)}
          >
            <div className="relative aspect-video max-h-[440px]">
              <Image
                src={featuredVideo.thumbnail}
                alt={locale === 'tr' ? featuredVideo.title : featuredVideo.titleEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/55 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gold/90 group-hover:bg-gold rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 mb-4">
                  <Play size={32} className="text-white ml-1.5" fill="white" />
                </div>
                <h2 className="font-serif text-white text-xl md:text-2xl font-bold text-center px-4 max-w-xl">
                  {locale === 'tr' ? featuredVideo.title : featuredVideo.titleEn}
                </h2>
                <p className="text-sand/70 text-sm mt-2">{featuredVideo.year} · {featuredVideo.duration}</p>
              </div>
              {/* Duration */}
              <div className="absolute bottom-4 right-4 bg-obsidian/80 text-white text-xs px-3 py-1 rounded font-mono">
                {featuredVideo.duration}
              </div>
            </div>
          </div>
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
              {key !== 'all' && (
                <span className="ml-1.5 text-[10px] opacity-50">
                  ({videos.filter(v => v.category === key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              locale={locale}
              t={t}
              onClick={() => setActiveVideo(video)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-stone">
            <p>{locale === 'tr' ? 'Bu kategoride video bulunamadı.' : 'No videos found in this category.'}</p>
          </div>
        )}
      </div>

      {activeVideo && (
        <VideoModal video={activeVideo} locale={locale} t={t} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  )
}
