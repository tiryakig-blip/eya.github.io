'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronRight, MapPin, Camera, X, Folder } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { MAHALLE_LIST, toSlug } from '@/lib/mockData'

// Drive klasör ID'leri — mahalle slug → Drive folder ID
const DRIVE_FOLDERS: Record<string, string> = {
  bayindir: '1N4dUg8hI8fmF16fsianVR2-LOK616sby',
  // Diğer mahalleler eklendikçe buraya eklenecek
}

interface DriveFolder { id: string; name: string }
interface DrivePhoto { id: string; name: string; url: string; urlFull: string }

export default function MahallePage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale } = useI18n()
  const mahalleName = MAHALLE_LIST.find(m => toSlug(m) === slug) ?? slug
  const driveFolderId = DRIVE_FOLDERS[slug]

  // Üst klasörler (lokasyonlar)
  const [locations, setLocations] = useState<DriveFolder[]>([])
  const [loading, setLoading] = useState(true)

  // Açık olan lokasyon
  const [openLoc, setOpenLoc] = useState<string | null>(null)

  // Lokasyonun alt klasörleri ve fotoğrafları
  const [locData, setLocData] = useState<Record<string, { folders: DriveFolder[]; photos: DrivePhoto[] }>>({})

  // Açık olan alt klasör
  const [openSub, setOpenSub] = useState<string | null>(null)
  const [subPhotos, setSubPhotos] = useState<Record<string, DrivePhoto[]>>({})

  // Lightbox
  const [lightbox, setLightbox] = useState<{ photos: DrivePhoto[]; index: number } | null>(null)

  // Üst klasörleri yükle
  useEffect(() => {
    if (!driveFolderId) { setLoading(false); return }
    fetch(`/api/drive?folderId=${driveFolderId}`)
      .then(r => r.json())
      .then(data => { setLocations(data.folders ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [driveFolderId])

  // Lokasyon açıldığında içeriğini yükle
  const openLocation = useCallback((locId: string) => {
    if (openLoc === locId) { setOpenLoc(null); return }
    setOpenLoc(locId)
    setOpenSub(null)
    if (!locData[locId]) {
      fetch(`/api/drive?folderId=${locId}`)
        .then(r => r.json())
        .then(data => setLocData(prev => ({ ...prev, [locId]: data })))
    }
  }, [openLoc, locData])

  // Alt klasör açıldığında fotoğrafları yükle
  const openSubFolder = useCallback((subId: string) => {
    if (openSub === subId) { setOpenSub(null); return }
    setOpenSub(subId)
    if (!subPhotos[subId]) {
      fetch(`/api/drive?folderId=${subId}`)
        .then(r => r.json())
        .then(data => setSubPhotos(prev => ({ ...prev, [subId]: data.photos ?? [] })))
    }
  }, [openSub, subPhotos])

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white z-10" onClick={() => setLightbox(null)}>
            <X size={24} />
          </button>
          {lightbox.photos.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl px-3 z-10"
                onClick={e => { e.stopPropagation(); setLightbox(p => p ? { ...p, index: (p.index - 1 + p.photos.length) % p.photos.length } : null) }}
              >‹</button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl px-3 z-10"
                onClick={e => { e.stopPropagation(); setLightbox(p => p ? { ...p, index: (p.index + 1) % p.photos.length } : null) }}
              >›</button>
            </>
          )}
          <img
            src={lightbox.photos[lightbox.index].urlFull}
            alt={lightbox.photos[lightbox.index].name}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-center">
            <span className="text-white/80 text-sm">{lightbox.photos[lightbox.index].name}</span>
            <br />
            <span className="text-white/40 text-xs">{lightbox.index + 1} / {lightbox.photos.length}</span>
          </div>
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
            <h1 className="font-serif text-white text-3xl font-bold">{mahalleName}</h1>
          </div>
          <p className="text-sand/50 text-sm ml-8">
            {locale === 'tr' ? 'Elmalı İlçesi' : 'Elmalı District'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Yükleniyor */}
        {loading && (
          <div className="text-center py-20 text-stone/50 text-sm">
            {locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}
          </div>
        )}

        {/* Drive bağlı değil */}
        {!loading && !driveFolderId && (
          <div className="bg-white border border-sand/60 rounded-sm p-6 text-center">
            <p className="text-stone/50 text-sm">
              {locale === 'tr'
                ? 'Bu mahalle için henüz veri bağlantısı oluşturulmadı.'
                : 'No data connection has been set up for this neighborhood yet.'}
            </p>
          </div>
        )}

        {/* Lokasyonlar */}
        {!loading && locations.length > 0 && (
          <div className="space-y-3">
            <p className="text-stone/50 text-xs mb-4">
              {locale === 'tr' ? `${locations.length} lokasyon` : `${locations.length} locations`}
            </p>

            {locations.map(loc => {
              const isOpen = openLoc === loc.id
              const data = locData[loc.id]

              return (
                <div key={loc.id} className="bg-white border border-sand/60 rounded-sm overflow-hidden">
                  {/* Lokasyon başlık */}
                  <button
                    onClick={() => openLocation(loc.id)}
                    className="w-full px-5 py-4 flex items-center gap-3 hover:bg-sand/5 transition-colors text-left"
                  >
                    {isOpen
                      ? <ChevronDown size={16} className="text-gold shrink-0" />
                      : <ChevronRight size={16} className="text-gold shrink-0" />
                    }
                    <Folder size={16} className="text-gold/60 shrink-0" />
                    <h2 className="font-semibold text-obsidian text-sm flex-1">{loc.name}</h2>
                  </button>

                  {/* Lokasyon içeriği */}
                  {isOpen && (
                    <div className="border-t border-sand/40">
                      {!data ? (
                        <div className="px-5 py-4 text-stone/40 text-xs">
                          {locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}
                        </div>
                      ) : (
                        <>
                          {/* Alt klasörler (kalıntı türleri) */}
                          {data.folders.length > 0 && (
                            <div className="divide-y divide-sand/30">
                              {data.folders.map(sub => {
                                const isSubOpen = openSub === sub.id
                                const photos = subPhotos[sub.id]

                                return (
                                  <div key={sub.id}>
                                    <button
                                      onClick={() => openSubFolder(sub.id)}
                                      className="w-full px-8 py-3 flex items-center gap-3 hover:bg-sand/5 transition-colors text-left"
                                    >
                                      {isSubOpen
                                        ? <ChevronDown size={12} className="text-gold/60 shrink-0" />
                                        : <ChevronRight size={12} className="text-gold/60 shrink-0" />
                                      }
                                      <span className="text-obsidian text-xs font-medium">{sub.name}</span>
                                      {photos && photos.length > 0 && (
                                        <span className="flex items-center gap-1 text-stone/40 text-[10px] ml-auto">
                                          <Camera size={10} /> {photos.length}
                                        </span>
                                      )}
                                    </button>
                                    {isSubOpen && (
                                      <div className="px-8 pb-4 bg-sand/5">
                                        {!photos ? (
                                          <p className="text-stone/40 text-xs">{locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}</p>
                                        ) : photos.length === 0 ? (
                                          <p className="text-stone/40 text-xs italic">{locale === 'tr' ? 'Fotoğraf bulunamadı.' : 'No photos found.'}</p>
                                        ) : (
                                          <PhotoGrid photos={photos} onOpen={(i) => setLightbox({ photos, index: i })} />
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          )}

                          {/* Lokasyondaki doğrudan fotoğraflar */}
                          {data.photos.length > 0 && (
                            <div className="px-5 py-4 bg-sand/5">
                              <PhotoGrid photos={data.photos} onOpen={(i) => setLightbox({ photos: data.photos, index: i })} />
                            </div>
                          )}

                          {data.folders.length === 0 && data.photos.length === 0 && (
                            <div className="px-5 py-4 text-stone/40 text-xs italic">
                              {locale === 'tr' ? 'Bu lokasyonda henüz içerik yok.' : 'No content in this location yet.'}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

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

function PhotoGrid({ photos, onOpen }: { photos: DrivePhoto[]; onOpen: (index: number) => void }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {photos.map((p, i) => (
        <div key={p.id} className="relative aspect-square cursor-pointer group" onClick={() => onOpen(i)}>
          <img
            src={p.url}
            alt={p.name}
            className="w-full h-full object-cover rounded border border-sand/40 group-hover:border-gold/60 transition-colors"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}
