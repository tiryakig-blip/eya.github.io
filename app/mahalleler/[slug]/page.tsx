'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronRight, MapPin, Camera, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { getMahalle, MAHALLE_LIST, toSlug } from '@/lib/mockData'

export default function MahallePage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale } = useI18n()
  const mahalle = getMahalle(slug)

  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  // photoDir → string[] URL cache
  const [photoCache, setPhotoCache] = useState<Record<string, string[]>>({})
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null)

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const fetchPhotos = useCallback(async (photoDir: string) => {
    if (photoCache[photoDir]) return
    try {
      const res = await fetch(`/api/mahalle-photos?path=${encodeURIComponent(photoDir)}`)
      const data = await res.json()
      setPhotoCache(prev => ({ ...prev, [photoDir]: data.photos ?? [] }))
    } catch {
      setPhotoCache(prev => ({ ...prev, [photoDir]: [] }))
    }
  }, [photoCache])

  // Açılan sekmenin fotoğraflarını yükle
  useEffect(() => {
    openItems.forEach(key => {
      const [catStr, itemStr] = key.split('-')
      const catIdx = parseInt(catStr)
      const cat = mahalle.categories[catIdx]
      if (!cat) return

      if (itemStr !== undefined) {
        const item = cat.items[parseInt(itemStr)]
        if (item?.photoDir) fetchPhotos(item.photoDir)
      } else if (cat.photoDir) {
        fetchPhotos(cat.photoDir)
      }
    })
  }, [openItems, mahalle.categories, fetchPhotos])

  const getPhotos = (photoDir?: string) => (photoDir ? photoCache[photoDir] ?? [] : [])

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white" onClick={() => setLightbox(null)}>
            <X size={24} />
          </button>
          {lightbox.photos.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl px-3"
                onClick={e => { e.stopPropagation(); setLightbox(p => p ? { ...p, index: (p.index - 1 + p.photos.length) % p.photos.length } : null) }}
              >‹</button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl px-3"
                onClick={e => { e.stopPropagation(); setLightbox(p => p ? { ...p, index: (p.index + 1) % p.photos.length } : null) }}
              >›</button>
            </>
          )}
          <img
            src={lightbox.photos[lightbox.index]}
            alt=""
            className="max-w-[90vw] max-h-[85vh] object-contain rounded shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <span className="absolute bottom-4 text-white/50 text-xs">
            {lightbox.index + 1} / {lightbox.photos.length}
          </span>
        </div>
      )}

      {/* Hero */}
      <div className="bg-obsidian px-4 py-12 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <Link href="/#mahalleler" className="inline-flex items-center gap-1 text-sand/50 text-xs hover:text-gold transition-colors mb-4">
            <ArrowLeft size={12} />
            {locale === 'tr' ? 'Tüm Mahalleler' : 'All Neighborhoods'}
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={20} className="text-gold" />
            <h1 className="font-serif text-white text-3xl font-bold">{mahalle.name}</h1>
          </div>
          <p className="text-sand/50 text-sm ml-8">
            {locale === 'tr' ? 'Elmalı İlçesi' : 'Elmalı District'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Açıklama */}
        <div className="bg-white border border-sand/60 rounded-sm p-6 mb-8">
          <p className="text-stone text-sm leading-relaxed">
            {locale === 'tr' ? mahalle.description : mahalle.descriptionEn}
          </p>
        </div>

        {/* Kategoriler */}
        <div className="space-y-6">
          {mahalle.categories.map((cat, catIdx) => (
            <div key={cat.title} className="bg-white border border-sand/60 rounded-sm overflow-hidden">
              {/* Kategori başlık */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-sand/40 bg-sand/10">
                <span className="text-xl">{cat.icon}</span>
                <h2 className="font-serif text-obsidian text-lg font-semibold">
                  {locale === 'tr' ? cat.title : cat.titleEn}
                </h2>
                {cat.items.length > 0 && (
                  <span className="text-stone/40 text-xs ml-auto">{cat.items.length}</span>
                )}
              </div>

              {/* Alt başlıklar olan kategoriler */}
              {cat.items.length > 0 ? (
                <div className="divide-y divide-sand/30">
                  {cat.items.map((item, itemIdx) => {
                    const key = `${catIdx}-${itemIdx}`
                    const isOpen = openItems.has(key)
                    const photos = getPhotos(item.photoDir)

                    return (
                      <div key={item.title}>
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full px-6 py-3 flex items-center gap-3 hover:bg-sand/5 transition-colors text-left"
                        >
                          {isOpen
                            ? <ChevronDown size={14} className="text-gold shrink-0" />
                            : <ChevronRight size={14} className="text-gold shrink-0" />
                          }
                          <h3 className="text-obsidian text-sm font-medium flex-1">
                            {locale === 'tr' ? item.title : item.titleEn}
                          </h3>
                          {photos.length > 0 && (
                            <span className="flex items-center gap-1 text-stone/40 text-[10px]">
                              <Camera size={10} /> {photos.length}
                            </span>
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-4 pt-1 bg-sand/5">
                            {(locale === 'tr' ? item.description : item.descriptionEn) && (
                              <p className="text-stone/60 text-xs mb-3 leading-relaxed">
                                {locale === 'tr' ? item.description : item.descriptionEn}
                              </p>
                            )}

                            <PhotoGrid
                              photos={photos}
                              onOpen={(i) => setLightbox({ photos, index: i })}
                              photoDir={item.photoDir}
                              locale={locale}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                /* Alt öğesi olmayan kategoriler (Çeşmeler, Sözlü Kültür) */
                (() => {
                  const catKey = `${catIdx}`
                  const isOpen = openItems.has(catKey)
                  const photos = getPhotos(cat.photoDir)

                  return (
                    <>
                      <button
                        onClick={() => { toggleItem(catKey); if (cat.photoDir) fetchPhotos(cat.photoDir) }}
                        className="w-full px-6 py-3 flex items-center gap-3 hover:bg-sand/5 transition-colors text-left"
                      >
                        {isOpen
                          ? <ChevronDown size={14} className="text-gold shrink-0" />
                          : <ChevronRight size={14} className="text-gold shrink-0" />
                        }
                        <span className="text-stone text-xs flex-1">
                          {locale === 'tr' ? 'Fotoğrafları göster' : 'Show photos'}
                        </span>
                        {photos.length > 0 && (
                          <span className="flex items-center gap-1 text-stone/40 text-[10px]">
                            <Camera size={10} /> {photos.length}
                          </span>
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 pt-1 bg-sand/5">
                          <PhotoGrid
                            photos={photos}
                            onOpen={(i) => setLightbox({ photos, index: i })}
                            photoDir={cat.photoDir}
                            locale={locale}
                          />
                        </div>
                      )}
                    </>
                  )
                })()
              )}
            </div>
          ))}
        </div>

        {/* Klasör bilgisi */}
        <div className="mt-8 bg-sand/20 border border-sand/40 rounded-sm px-5 py-4">
          <p className="text-stone/60 text-xs leading-relaxed">
            {locale === 'tr'
              ? <>Fotoğraf eklemek için <code className="bg-white px-1.5 py-0.5 rounded text-[10px] font-mono border border-sand/40">public/mahalleler/{slug}/</code> klasörüne ilgili alt klasöre dosyaları kopyalayın. Sayfa yenilendiğinde otomatik görünür.</>
              : <>To add photos, copy files into the relevant subfolder of <code className="bg-white px-1.5 py-0.5 rounded text-[10px] font-mono border border-sand/40">public/mahalleler/{slug}/</code>. They will appear automatically on page refresh.</>
            }
          </p>
        </div>

        {/* Diğer Mahalleler */}
        <div className="mt-12 border-t border-sand/60 pt-8">
          <h3 className="font-serif text-obsidian text-base font-semibold mb-4">
            {locale === 'tr' ? 'Diğer Mahalleler' : 'Other Neighborhoods'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {MAHALLE_LIST.filter(m => toSlug(m) !== slug).map(m => (
              <Link
                key={m}
                href={`/mahalleler/${toSlug(m)}`}
                className="text-xs px-3 py-1.5 border border-sand/50 rounded-sm text-stone hover:border-gold hover:text-gold transition-colors"
              >
                {m}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Fotoğraf grid bileşeni */
function PhotoGrid({ photos, onOpen, photoDir, locale }: {
  photos: string[]
  onOpen: (index: number) => void
  photoDir?: string
  locale: string
}) {
  if (photos.length === 0) {
    return (
      <p className="text-stone/40 text-xs italic">
        {locale === 'tr'
          ? `Henüz fotoğraf eklenmedi.${photoDir ? ` Klasör: public/mahalleler/${photoDir}/` : ''}`
          : `No photos yet.${photoDir ? ` Folder: public/mahalleler/${photoDir}/` : ''}`
        }
      </p>
    )
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {photos.map((url, i) => (
        <div
          key={url}
          className="relative aspect-square cursor-pointer group"
          onClick={() => onOpen(i)}
        >
          <img
            src={url}
            alt=""
            className="w-full h-full object-cover rounded border border-sand/40 group-hover:border-gold/60 transition-colors"
          />
        </div>
      ))}
    </div>
  )
}
