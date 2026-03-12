'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight, MapPin, User, Calendar, ZoomIn, ArrowLeft } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { photos } from '@/lib/mockData'
import clsx from 'clsx'

function Lightbox({ photos: list, index, onClose, onPrev, onNext, locale }: {
  photos: typeof photos; index: number; onClose: () => void; onPrev: () => void; onNext: () => void; locale: string
}) {
  const photo = list[index]
  if (!photo) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center lightbox-backdrop bg-obsidian/90 animate-fade-in">
      <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"><X size={18} /></button>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">{index + 1} / {list.length}</div>
      <button onClick={onPrev} disabled={index === 0} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors disabled:opacity-30"><ChevronLeft size={20} /></button>
      <div className="max-w-4xl max-h-[70vh] w-full px-16 flex items-center justify-center">
        <div className="relative w-full" style={{ aspectRatio: `${photo.width}/${photo.height}`, maxHeight: '65vh' }}>
          <Image src={photo.src} alt={locale === 'tr' ? photo.title : photo.titleEn} fill className="object-contain" />
        </div>
      </div>
      <button onClick={onNext} disabled={index === list.length - 1} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors disabled:opacity-30"><ChevronRight size={20} /></button>
      <div className="absolute bottom-0 left-0 right-0 bg-obsidian/80 border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold text-sm">{locale === 'tr' ? photo.title : photo.titleEn}</h3>
            <div className="flex items-center gap-4 mt-1 text-xs text-white/50">
              <span className="flex items-center gap-1"><MapPin size={11} />{photo.location}</span>
              <span className="flex items-center gap-1"><User size={11} />{photo.photographer}</span>
              <span className="flex items-center gap-1"><Calendar size={11} />{photo.date}</span>
            </div>
          </div>
          <span className="text-white/30 text-xs">{photo.width}×{photo.height}</span>
        </div>
      </div>
    </div>
  )
}

export default function FotograflarPage() {
  const { locale } = useI18n()
  const [category, setCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const categories = [
    { key: 'all',        label: locale === 'tr' ? 'Tümü' : 'All' },
    { key: 'excavation', label: locale === 'tr' ? 'Kazı Süreci' : 'Excavation' },
    { key: 'findings',   label: locale === 'tr' ? 'Buluntular' : 'Findings' },
    { key: 'landscape',  label: locale === 'tr' ? 'Peyzaj' : 'Landscape' },
    { key: 'lab',        label: locale === 'tr' ? 'Laboratuvar' : 'Lab' },
    { key: 'team',       label: locale === 'tr' ? 'Ekip' : 'Team' },
  ]

  const filtered = useMemo(() =>
    category === 'all' ? photos : photos.filter(p => p.category === category),
    [category]
  )

  const prev = () => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i))
  const next = () => setLightboxIndex(i => (i !== null && i < filtered.length - 1 ? i + 1 : i))

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      <div className="bg-obsidian px-4 py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <Link href="/galeri" className="flex items-center gap-1.5 text-sand/50 hover:text-sand text-xs mb-4 transition-colors w-fit">
            <ArrowLeft size={13} /> {locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}
          </Link>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}</p>
          <h1 className="font-serif text-white text-3xl font-bold">{locale === 'tr' ? 'Fotoğraflar' : 'Photographs'}</h1>
          <p className="text-sand/60 mt-1 text-sm">{photos.length} {locale === 'tr' ? 'fotoğraf' : 'photos'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 flex-wrap mb-8 justify-center">
          {categories.map(({ key, label }) => (
            <button key={key} onClick={() => setCategory(key)}
              className={clsx('px-4 py-1.5 text-sm rounded-sm border transition-all duration-200',
                category === key ? 'bg-obsidian text-white border-obsidian' : 'bg-white text-stone border-sand/70 hover:border-stone hover:text-obsidian'
              )}>
              {label}
              {key !== 'all' && <span className="ml-1.5 text-[10px] opacity-50">({photos.filter(p => p.category === key).length})</span>}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
          {filtered.map((photo, i) => (
            <div key={photo.id} onClick={() => setLightboxIndex(i)}
              className="break-inside-avoid group relative overflow-hidden rounded-sm cursor-pointer bg-sand/20 border border-sand/40 hover:border-gold/40 transition-all duration-300 hover:shadow-xl">
              <Image src={photo.thumb} alt={locale === 'tr' ? photo.title : photo.titleEn} width={photo.width} height={photo.height} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/55 transition-all duration-300">
                <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-end"><div className="w-8 h-8 bg-white/10 backdrop-blur rounded-full flex items-center justify-center"><ZoomIn size={14} className="text-white" /></div></div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-snug">{locale === 'tr' ? photo.title : photo.titleEn}</p>
                    <span className="text-white/60 text-[10px] flex items-center gap-0.5 mt-1"><MapPin size={9} />{photo.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox photos={filtered} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onPrev={prev} onNext={next} locale={locale} />
      )}
    </div>
  )
}
