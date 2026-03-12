'use client'

import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Polyline, Polygon, Popup, LayersControl, LayerGroup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { excavationSites, findingPoints } from '@/lib/mockData'
import { useI18n } from '@/lib/i18n'
import clsx from 'clsx'

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const periodColors: Record<string, string> = {
  'Prehistorik': '#795548', 'Prehistoric': '#795548',
  'Paleolitik':  '#6D4C41', 'Paleolithic': '#6D4C41',
  'Neolitik':    '#8D6E63', 'Neolithic':   '#8D6E63',
  'Kalkolitik':  '#BF8D3C', 'Chalcolithic': '#BF8D3C',
  'Tunç Çağı':  '#DAA520', 'Bronze Age':  '#DAA520',
  'Demir Çağı': '#8B4513', 'Iron Age':    '#8B4513',
  'Akhamenid Öncesi': '#A0522D', 'Pre-Achaemenid': '#A0522D',
  'Akhamenid':  '#CD853F', 'Achaemenid':  '#CD853F',
  'Helenistik': '#4169E1', 'Hellenistic': '#4169E1',
  'Roma':       '#4169E1', 'Roman':       '#4169E1',
  'Doğu Roma':  '#9C27B0', 'Byzantine':   '#9C27B0',
  'Osmanlı':    '#2E7D32', 'Ottoman':     '#2E7D32',
  'Cumhuriyet': '#C62828', 'Republican':  '#C62828',
}

const periodToLayer: Record<string, string> = {
  'Prehistorik': 'prehistoric', 'Prehistoric': 'prehistoric',
  'Paleolitik':  'paleolithic', 'Paleolithic': 'paleolithic',
  'Neolitik':    'neolithic',   'Neolithic':   'neolithic',
  'Kalkolitik':  'chalcolithic','Chalcolithic':'chalcolithic',
  'Tunç Çağı':   'bronze',     'Bronze Age':   'bronze',
  'Demir Çağı':  'iron',       'Iron Age':     'iron',
  'Akhamenid Öncesi': 'iron_pre_achaemenid', 'Pre-Achaemenid': 'iron_pre_achaemenid',
  'Akhamenid':   'iron_achaemenid', 'Achaemenid': 'iron_achaemenid',
  'Helenistik':  'hellenistic_roman', 'Hellenistic': 'hellenistic_roman',
  'Roma':        'hellenistic_roman', 'Roman':       'hellenistic_roman',
  'Doğu Roma':   'byzantine',  'Byzantine':  'byzantine',
  'Osmanlı':     'ottoman',    'Ottoman':    'ottoman',
  'Cumhuriyet':  'republic',   'Republican': 'republic',
}

const categoryColors: Record<string, string> = {
  ceramics: '#E07B54', metal: '#708090', numismatics: '#FFD700',
  lithic: '#808080', bone: '#F5DEB3', sculpture: '#4682B4', jewelry: '#FF69B4',
}

const MAHALLELER = [
  '—',
  'Afşar', 'Ahatlı', 'Akçaeniş', 'Akçay', 'Armutlu',
  'Bayındır', 'Bayralar', 'Beyler', 'Bozhüyük', 'Büyüksöğle',
  'Camiatik', 'Camicedit', 'Çalpınar', 'Çaybaşı', 'Çobanisa', 'Çukurelma',
  'Dereköy', 'Düden',
  'Eskihisar', 'Eymir',
  'Geçit', 'Geçmen', 'Gökpınar', 'Göltarla', 'Gümüşyaka', 'Gündoğan',
  'Hacımusalar', 'Hacıyusuflar',
  'İmircik', 'İplik Pazarı', 'İslamlar',
  'Kapmescit', 'Karaköy', 'Karamık', 'Karyağdı', 'Kışla', 'Kızılca', 'Kocapınar', 'Kuzköy', 'Küçüksöğle',
  'Macun', 'Mursal', 'Müren',
  'Ovacık', 'Özdemir',
  'Pirhasanlar',
  'Salur', 'Sarılar',
  'Tahtamescit', 'Tavullar', 'Tekke', 'Toklular',
  'Yakaçiftlikköyü', 'Yalnızdam', 'Yapraklı', 'Yeni', 'Yılmazlı', 'Yörenler', 'Yuva',
  'Zümrütova',
]

const PERIODS = [
  'Prehistorik', 'Paleolitik', 'Neolitik',
  'Kalkolitik', 'Tunç Çağı', 'Demir Çağı',
  'Akhamenid Öncesi', 'Akhamenid', 'Helenistik', 'Roma',
  'Doğu Roma', 'Osmanlı', 'Cumhuriyet',
]
const SITE_TYPES = ['Yok', 'Arkeolojik Sit', 'Kentsel Sit', 'Kırsal Sit', 'Doğal Sit', 'Anıt Ağaç', 'Milli Park']

const KURUMLAR = [
  'Akdeniz Üniversitesi',
  'Antalya Kültürel Miras Derneği (ANKA)',
  'Başkent Üniversitesi',
  'Çanakkale Onsekiz Mart Üniversitesi',
  'Elmalı Belediyesi',
  'Elmalı Müze Müdürlüğü',
  'Koç Üniversitesi Akdeniz Medeniyetleri Araştırma Merkezi',
]

type DrawMode = 'none' | 'point' | 'line' | 'polygon'

interface SelectedFeature {
  type: 'excavation' | 'finding'
  data: typeof excavationSites[0] | typeof findingPoints[0]
}

interface TempPoint {
  id: string; lat: number; lng: number
  name: string; period: string; status: 'active' | 'completed'
  description: string; photos: string[]; kurumlar: string[]
}

interface TempShape {
  id: string; type: 'line' | 'polygon'
  points: [number, number][]
  name: string; period: string; status: 'active' | 'completed'
  description: string; publication: string; source: string
  tescil: string; siteType: string; photos: string[]; kurumlar: string[]
}

function FlyToCenter() {
  const map = useMap()
  useEffect(() => { map.setView([36.733, 29.917], 12) }, [map])
  return null
}

function DrawHandler({
  drawMode, hasPending,
  onPointClick, onShapeClick, onShapeDblClick,
}: {
  drawMode: DrawMode; hasPending: boolean
  onPointClick: (lat: number, lng: number) => void
  onShapeClick: (lat: number, lng: number) => void
  onShapeDblClick: () => void
}) {
  useMapEvents({
    click(e) {
      if (drawMode === 'point' && !hasPending) onPointClick(e.latlng.lat, e.latlng.lng)
      if ((drawMode === 'line' || drawMode === 'polygon') && !hasPending) onShapeClick(e.latlng.lat, e.latlng.lng)
    },
    dblclick(e) {
      L.DomEvent.stopPropagation(e)
      if ((drawMode === 'line' || drawMode === 'polygon') && !hasPending) onShapeDblClick()
    },
  })
  return null
}

interface Props {
  selected: SelectedFeature | null
  onSelect: (f: SelectedFeature | null) => void
  layers: Record<string, boolean>
}

const emptyForm = {
  name: '', period: 'Prehistorik', status: 'active' as 'active' | 'completed',
  description: '', publication: '', source: '', tescil: 'Yok', siteType: 'Yok',
  mahalle: '—', mevki: '', muhit: '', antikAd: '', kurumlar: [] as string[],
}

export default function MapClient({ selected, onSelect, layers }: Props) {
  const { locale } = useI18n()
  const [mounted, setMounted] = useState(false)

  // draw mode
  const [drawMode, setDrawMode] = useState<DrawMode>('none')

  // nokta
  const [pending, setPending] = useState<{ lat: number; lng: number } | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [photos, setPhotos] = useState<string[]>([])
  const [tempPoints, setTempPoints] = useState<TempPoint[]>([])

  // çizgi / poligon
  const [drawingPts, setDrawingPts] = useState<[number, number][]>([])
  const [shapeForm, setShapeForm] = useState(emptyForm)
  const [shapePhotos, setShapePhotos] = useState<string[]>([])
  const [pendingShape, setPendingShape] = useState<{ type: 'line' | 'polygon'; points: [number, number][] } | null>(null)
  const [tempShapes, setTempShapes] = useState<TempShape[]>([])

  const [copied, setCopied] = useState(false)
  const [shapeCopied, setShapeCopied] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const shapeFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="w-full h-full bg-sand/20 flex items-center justify-center text-stone">Harita yükleniyor…</div>

  const visibleSites    = excavationSites.filter(s => layers[periodToLayer[s.period] ?? ''])
  const visibleFindings = findingPoints.filter(f => layers[periodToLayer[f.period] ?? ''])

  const switchMode = (mode: DrawMode) => {
    setDrawMode(prev => prev === mode ? 'none' : mode)
    setPending(null); setDrawingPts([]); setPendingShape(null); setPhotos([]); setShapePhotos([])
  }

  // ── Nokta ────────────────────────────────────────────
  const handlePointClick = (lat: number, lng: number) => {
    setPending({ lat, lng }); setForm(emptyForm); setPhotos([])
  }
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.slice(0, 10 - photos.length).forEach(f => setPhotos(prev => [...prev, URL.createObjectURL(f)]))
    e.target.value = ''
  }
  const handleAddPoint = () => {
    if (!pending || !form.name.trim()) return
    setTempPoints(prev => [...prev, { id: `pt-${Date.now()}`, lat: pending.lat, lng: pending.lng, name: form.name, period: form.period, status: form.status, description: form.description, photos, kurumlar: form.kurumlar }])
    setPending(null); setDrawMode('none'); setPhotos([])
  }

  // ── Çizgi / Poligon ─────────────────────────────────
  const handleShapeClick = (lat: number, lng: number) => {
    setDrawingPts(prev => [...prev, [lat, lng]])
  }
  const handleShapeDblClick = () => {
    if (drawingPts.length < 2) return
    setPendingShape({ type: drawMode as 'line' | 'polygon', points: drawingPts })
    setShapeForm(emptyForm); setShapePhotos([])
    setDrawingPts([])
  }
  const handleShapePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.slice(0, 10 - shapePhotos.length).forEach(f => setShapePhotos(prev => [...prev, URL.createObjectURL(f)]))
    e.target.value = ''
  }
  const handleAddShape = () => {
    if (!pendingShape || !shapeForm.name.trim()) return
    setTempShapes(prev => [...prev, {
      id: `sh-${Date.now()}`, type: pendingShape.type, points: pendingShape.points,
      name: shapeForm.name, period: shapeForm.period, status: shapeForm.status,
      description: shapeForm.description, publication: shapeForm.publication,
      source: shapeForm.source, tescil: shapeForm.tescil, siteType: shapeForm.siteType,
      photos: shapePhotos, kurumlar: shapeForm.kurumlar,
    }])
    setPendingShape(null); setDrawMode('none'); setShapePhotos([])
  }

  const codeSnippet = pending
    ? `{ id: X, name: '${form.name || 'Alan Adı'}', nameEn: '', lat: ${pending.lat.toFixed(6)}, lng: ${pending.lng.toFixed(6)}, period: '${form.period}', periodEn: '', status: '${form.status}', siteType: '${form.siteType}', tescil: '${form.tescil}', mahalle: '${form.mahalle}', mevki: '${form.mevki}', muhit: '${form.muhit}', antikAd: '${form.antikAd}', description: '${form.description}', publication: '${form.publication}', source: '${form.source}', kurumlar: [${form.kurumlar.map(k => `'${k}'`).join(', ')}] },`
    : ''
  const handleCopy = () => { navigator.clipboard.writeText(codeSnippet); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  const shapeCodeSnippet = pendingShape
    ? `{ id: X, name: '${shapeForm.name || 'Alan Adı'}', nameEn: '', type: '${pendingShape.type}', points: [${pendingShape.points.map(([a,b]) => `[${a.toFixed(6)},${b.toFixed(6)}]`).join(', ')}], period: '${shapeForm.period}', periodEn: '', status: '${shapeForm.status}', siteType: '${shapeForm.siteType}', tescil: '${shapeForm.tescil}', mahalle: '${shapeForm.mahalle}', mevki: '${shapeForm.mevki}', muhit: '${shapeForm.muhit}', antikAd: '${shapeForm.antikAd}', description: '${shapeForm.description}', publication: '${shapeForm.publication}', source: '${shapeForm.source}', kurumlar: [${shapeForm.kurumlar.map(k => `'${k}'`).join(', ')}] },`
    : ''
  const handleShapeCopy = () => { navigator.clipboard.writeText(shapeCodeSnippet); setShapeCopied(true); setTimeout(() => setShapeCopied(false), 2000) }

  const isDrawing = drawMode !== 'none'
  const cursorStyle = isDrawing && !pending && !pendingShape ? 'crosshair' : ''

  return (
    <div className="relative w-full h-full">

      {/* ── Araç Çubuğu ─────────────────────────────── */}
      <div className="absolute top-3 left-3 z-[1000] flex gap-1">
        {([
          { mode: 'point',   label: '⬤ Nokta',   title: 'Nokta Ekle' },
          { mode: 'line',    label: '╱ Çizgi',   title: 'Çizgi Ekle' },
          { mode: 'polygon', label: '⬡ Poligon', title: 'Poligon Ekle' },
        ] as { mode: DrawMode; label: string; title: string }[]).map(({ mode, label, title }) => (
          <button
            key={mode}
            title={title}
            onClick={() => switchMode(mode)}
            className={clsx(
              'px-3 py-1.5 text-xs font-medium rounded shadow transition-all',
              drawMode === mode
                ? 'bg-gold text-obsidian ring-2 ring-gold/50'
                : 'bg-obsidian/90 text-sand hover:bg-obsidian'
            )}
          >
            {drawMode === mode ? '✕ İptal' : label}
          </button>
        ))}
      </div>

      {/* İpucu */}
      {isDrawing && !pending && !pendingShape && (
        <div className="absolute top-12 left-3 z-[1000] bg-obsidian/90 text-sand text-[11px] px-3 py-2 rounded shadow max-w-[220px] leading-snug">
          {drawMode === 'point' && 'Haritada bir noktaya tıklayın'}
          {drawMode === 'line' && `Tıklayarak nokta ekleyin${drawingPts.length >= 2 ? ' — çift tıklayarak bitirin' : ''}`}
          {drawMode === 'polygon' && `Tıklayarak köşe ekleyin${drawingPts.length >= 3 ? ' — çift tıklayarak kapatın' : ''}`}
          {drawingPts.length > 0 && <span className="block text-gold/80 mt-0.5">{drawingPts.length} nokta</span>}
        </div>
      )}

      {/* ── Nokta Formu ──────────────────────────────── */}
      {pending && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/40 overflow-auto py-4">
          <div className="bg-white rounded shadow-xl w-[360px] p-5 text-obsidian max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-semibold text-sm mb-4">Yeni Nokta Ekle</h3>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Koordinatlar</label>
                <div className="w-full border border-sand/40 bg-gray-50 rounded px-2 py-1.5 text-xs text-stone font-mono">
                  {pending.lat.toFixed(6)},&nbsp;{pending.lng.toFixed(6)}
                </div>
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Alan Adı *</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. Elmalı Höyüğü" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Antik Adı</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. Choma, Oenoanda…" value={form.antikAd} onChange={e => setForm(f => ({ ...f, antikAd: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Mahalle Adı</label>
                <select className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" value={form.mahalle} onChange={e => setForm(f => ({ ...f, mahalle: e.target.value }))}>
                  {MAHALLELER.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Mevki Adı</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. Taşlık Tepe" value={form.mevki} onChange={e => setForm(f => ({ ...f, mevki: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Muhit Adı</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. Avlan Gölü Çevresi" value={form.muhit} onChange={e => setForm(f => ({ ...f, muhit: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Dönem</label>
                <select className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))}>
                  {PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Koruma Statüsü</label>
                <select className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" value={form.siteType} onChange={e => setForm(f => ({ ...f, siteType: e.target.value }))}>
                  {SITE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Tescil Durumu</label>
                <select className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" value={form.tescil} onChange={e => setForm(f => ({ ...f, tescil: e.target.value }))}>
                  <option value="Yok">Yok</option>
                  <option value="Var">Var</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Yayın</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. Anatolian Studies 2020, s.45" value={form.publication} onChange={e => setForm(f => ({ ...f, publication: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Açıklama</label>
                <textarea className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold resize-none" rows={2} placeholder="Kısa açıklama…" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Kaynak</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. TAY Projesi, MÖ 3. binyıl" value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} />
              </div>
              {/* Kurumlar */}
              <div>
                <label className="text-[11px] text-stone block mb-1 font-medium">Kurumlar</label>
                <div className="space-y-1">
                  {KURUMLAR.map(k => (
                    <label key={k} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={form.kurumlar.includes(k)}
                        onChange={() => setForm(f => ({
                          ...f,
                          kurumlar: f.kurumlar.includes(k) ? f.kurumlar.filter(x => x !== k) : [...f.kurumlar, k],
                        }))}
                        className="accent-gold w-3 h-3 rounded"
                      />
                      <span className="text-[11px] text-stone group-hover:text-obsidian leading-tight">{k}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Fotoğraflar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-stone font-medium">Fotoğraflar <span className="text-stone/50 font-normal">({photos.length}/10)</span></label>
                  {photos.length < 10 && <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[10px] text-gold hover:text-gold/70 font-medium">+ Ekle</button>}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoChange} />
                {photos.length > 0 ? (
                  <div className="grid grid-cols-5 gap-1">
                    {photos.map((url, i) => (
                      <div key={i} className="relative group aspect-square">
                        <img src={url} alt="" className="w-full h-full object-cover rounded cursor-pointer border border-sand/40 hover:border-gold/60" onClick={() => setLightbox(url)} />
                        <button type="button" onClick={() => setPhotos(p => p.filter((_, j) => j !== i))} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] hidden group-hover:flex items-center justify-center">×</button>
                      </div>
                    ))}
                    {photos.length < 10 && <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square border border-dashed border-sand/60 rounded flex items-center justify-center text-stone/40 hover:border-gold/60 text-lg">+</button>}
                  </div>
                ) : (
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full border border-dashed border-sand/60 rounded py-3 text-[11px] text-stone/50 hover:border-gold/60 hover:text-gold/60 transition-colors">Fotoğraf seçmek için tıklayın (max. 10)</button>
                )}
              </div>
            </div>
            <div className="bg-gray-50 border border-sand/40 rounded p-2 mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-stone/60 font-mono uppercase">mockData.ts için kod</span>
                <button onClick={handleCopy} className="text-[10px] text-gold hover:text-gold/70 font-medium">{copied ? 'Kopyalandı ✓' : 'Kopyala'}</button>
              </div>
              <pre className="text-[9px] text-stone break-all whitespace-pre-wrap font-mono leading-relaxed">{codeSnippet}</pre>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddPoint} disabled={!form.name.trim()} className="flex-1 bg-obsidian text-white text-xs py-1.5 rounded hover:bg-obsidian/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Haritaya Ekle</button>
              <button onClick={() => { setPending(null); setPhotos([]) }} className="px-3 text-xs text-stone border border-sand/70 rounded hover:border-stone transition-colors">İptal</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Çizgi / Poligon Formu ────────────────────── */}
      {pendingShape && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/40 overflow-auto py-4">
          <div className="bg-white rounded shadow-xl w-[360px] p-5 text-obsidian max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-semibold text-sm mb-1">
              {pendingShape.type === 'line' ? 'Yeni Çizgi Ekle' : 'Yeni Poligon Ekle'}
            </h3>
            <p className="text-[11px] text-stone/60 mb-4">{pendingShape.points.length} köşe noktası</p>
            <div className="space-y-3 mb-4">
              {/* Koordinatlar özeti */}
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Koordinatlar</label>
                <div className="w-full border border-sand/40 bg-gray-50 rounded px-2 py-1.5 text-xs text-stone font-mono max-h-14 overflow-y-auto">
                  {pendingShape.points.map(([a, b], i) => <div key={i}>{a.toFixed(6)}, {b.toFixed(6)}</div>)}
                </div>
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Alan Adı *</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder={pendingShape.type === 'line' ? 'örn. Eski Yol Güzergahı' : 'örn. Koruma Alanı Sınırı'} value={shapeForm.name} onChange={e => setShapeForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Antik Adı</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. Choma, Oenoanda…" value={shapeForm.antikAd} onChange={e => setShapeForm(f => ({ ...f, antikAd: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Mahalle Adı</label>
                <select className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" value={shapeForm.mahalle} onChange={e => setShapeForm(f => ({ ...f, mahalle: e.target.value }))}>
                  {MAHALLELER.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Mevki Adı</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. Taşlık Tepe" value={shapeForm.mevki} onChange={e => setShapeForm(f => ({ ...f, mevki: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Muhit Adı</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. Avlan Gölü Çevresi" value={shapeForm.muhit} onChange={e => setShapeForm(f => ({ ...f, muhit: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Dönem</label>
                <select className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" value={shapeForm.period} onChange={e => setShapeForm(f => ({ ...f, period: e.target.value }))}>
                  {PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Koruma Statüsü</label>
                <select className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" value={shapeForm.siteType} onChange={e => setShapeForm(f => ({ ...f, siteType: e.target.value }))}>
                  {SITE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Tescil Durumu</label>
                <select className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" value={shapeForm.tescil} onChange={e => setShapeForm(f => ({ ...f, tescil: e.target.value }))}>
                  <option value="Yok">Yok</option>
                  <option value="Var">Var</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Yayın</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. Anatolian Studies 2020, s.45" value={shapeForm.publication} onChange={e => setShapeForm(f => ({ ...f, publication: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Açıklama</label>
                <textarea className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold resize-none" rows={2} placeholder="Kısa açıklama…" value={shapeForm.description} onChange={e => setShapeForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] text-stone block mb-0.5 font-medium">Kaynak</label>
                <input className="w-full border border-sand/70 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-gold" placeholder="örn. TAY Projesi, MÖ 3. binyıl" value={shapeForm.source} onChange={e => setShapeForm(f => ({ ...f, source: e.target.value }))} />
              </div>
              {/* Kurumlar */}
              <div>
                <label className="text-[11px] text-stone block mb-1 font-medium">Kurumlar</label>
                <div className="space-y-1">
                  {KURUMLAR.map(k => (
                    <label key={k} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={shapeForm.kurumlar.includes(k)}
                        onChange={() => setShapeForm(f => ({
                          ...f,
                          kurumlar: f.kurumlar.includes(k) ? f.kurumlar.filter(x => x !== k) : [...f.kurumlar, k],
                        }))}
                        className="accent-gold w-3 h-3 rounded"
                      />
                      <span className="text-[11px] text-stone group-hover:text-obsidian leading-tight">{k}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Fotoğraflar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-stone font-medium">Fotoğraflar <span className="text-stone/50 font-normal">({shapePhotos.length}/10)</span></label>
                  {shapePhotos.length < 10 && <button type="button" onClick={() => shapeFileInputRef.current?.click()} className="text-[10px] text-gold hover:text-gold/70 font-medium">+ Ekle</button>}
                </div>
                <input ref={shapeFileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleShapePhotoChange} />
                {shapePhotos.length > 0 ? (
                  <div className="grid grid-cols-5 gap-1">
                    {shapePhotos.map((url, i) => (
                      <div key={i} className="relative group aspect-square">
                        <img src={url} alt="" className="w-full h-full object-cover rounded cursor-pointer border border-sand/40 hover:border-gold/60" onClick={() => setLightbox(url)} />
                        <button type="button" onClick={() => setShapePhotos(p => p.filter((_, j) => j !== i))} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] hidden group-hover:flex items-center justify-center">×</button>
                      </div>
                    ))}
                    {shapePhotos.length < 10 && <button type="button" onClick={() => shapeFileInputRef.current?.click()} className="aspect-square border border-dashed border-sand/60 rounded flex items-center justify-center text-stone/40 hover:border-gold/60 text-lg">+</button>}
                  </div>
                ) : (
                  <button type="button" onClick={() => shapeFileInputRef.current?.click()} className="w-full border border-dashed border-sand/60 rounded py-3 text-[11px] text-stone/50 hover:border-gold/60 hover:text-gold/60 transition-colors">Fotoğraf seçmek için tıklayın (max. 10)</button>
                )}
              </div>
            </div>
            {/* Kod çıktısı */}
            <div className="bg-gray-50 border border-sand/40 rounded p-2 mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-stone/60 font-mono uppercase">mockData.ts için kod</span>
                <button onClick={handleShapeCopy} className="text-[10px] text-gold hover:text-gold/70 font-medium">{shapeCopied ? 'Kopyalandı ✓' : 'Kopyala'}</button>
              </div>
              <pre className="text-[9px] text-stone break-all whitespace-pre-wrap font-mono leading-relaxed">{shapeCodeSnippet}</pre>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddShape} disabled={!shapeForm.name.trim()} className="flex-1 bg-obsidian text-white text-xs py-1.5 rounded hover:bg-obsidian/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Haritaya Ekle</button>
              <button onClick={() => { setPendingShape(null); setShapePhotos([]) }} className="px-3 text-xs text-stone border border-sand/70 rounded hover:border-stone transition-colors">İptal</button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="absolute inset-0 z-[2000] bg-black/80 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="max-w-[90%] max-h-[90%] object-contain rounded shadow-2xl" />
        </div>
      )}

      <MapContainer center={[36.733, 29.917]} zoom={12} className="w-full h-full" zoomControl={true} style={{ cursor: cursorStyle }} doubleClickZoom={drawMode === 'line' || drawMode === 'polygon' ? false : true}>
        <FlyToCenter />
        <DrawHandler
          drawMode={drawMode} hasPending={!!pending || !!pendingShape}
          onPointClick={handlePointClick}
          onShapeClick={handleShapeClick}
          onShapeDblClick={handleShapeDblClick}
        />

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Sokak Haritası">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Uydu">
            <TileLayer attribution='Tiles &copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Uydu + Etiketler">
            <LayerGroup>
              <TileLayer attribution='Tiles &copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              <TileLayer attribution="" url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png" opacity={0.6} />
            </LayerGroup>
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Kazı Alanları */}
        {visibleSites.map(site => (
          <CircleMarker key={`exc-${site.id}`} center={[site.lat, site.lng]} radius={14}
            pathOptions={{ color: site.status === 'active' ? '#22c55e' : '#94a3b8', fillColor: periodColors[site.period] ?? '#1C1917', fillOpacity: 0.85, weight: 2.5 }}
            eventHandlers={{ click: () => onSelect({ type: 'excavation', data: site }) }}>
            <Popup><strong>{locale === 'tr' ? site.name : site.nameEn}</strong><br /><span className="text-xs text-gray-500">{locale === 'tr' ? site.period : site.periodEn}</span></Popup>
          </CircleMarker>
        ))}

        {/* Buluntu Noktaları */}
        {visibleFindings.map(fp => (
          <CircleMarker key={`fp-${fp.id}`} center={[fp.lat, fp.lng]} radius={7}
            pathOptions={{ color: 'white', fillColor: categoryColors[fp.category] ?? '#B8860B', fillOpacity: 0.9, weight: 1.5 }}
            eventHandlers={{ click: () => onSelect({ type: 'finding', data: fp }) }}>
            <Popup><strong>{locale === 'tr' ? fp.name : fp.nameEn}</strong><br /><span className="text-xs text-gray-500">{locale === 'tr' ? fp.period : fp.periodEn}</span></Popup>
          </CircleMarker>
        ))}

        {/* Geçici noktalar */}
        {tempPoints.map(pt => (
          <CircleMarker key={pt.id} center={[pt.lat, pt.lng]} radius={14}
            pathOptions={{ color: '#F59E0B', fillColor: periodColors[pt.period] ?? '#795548', fillOpacity: 0.85, weight: 3, dashArray: '4 3' }}>
            <Popup>
              <strong>{pt.name}</strong> <span className="text-[10px] text-amber-600">(taslak)</span><br />
              <span className="text-xs text-gray-500">{pt.period}</span>
              {pt.description && <><br /><span className="text-xs">{pt.description}</span></>}
              {pt.photos.length > 0 && <div className="flex gap-1 mt-1 flex-wrap">{pt.photos.map((url, i) => <img key={i} src={url} alt="" className="w-10 h-10 object-cover rounded border border-gray-200" />)}</div>}
            </Popup>
          </CircleMarker>
        ))}

        {/* Çizim önizlemesi */}
        {drawingPts.length >= 2 && drawMode === 'line' && (
          <Polyline positions={drawingPts} pathOptions={{ color: '#F59E0B', weight: 2.5, dashArray: '6 4' }} />
        )}
        {drawingPts.length >= 3 && drawMode === 'polygon' && (
          <Polygon positions={drawingPts} pathOptions={{ color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 0.15, weight: 2.5, dashArray: '6 4' }} />
        )}
        {drawingPts.map((pt, i) => (
          <CircleMarker key={`dp-${i}`} center={pt} radius={4} pathOptions={{ color: '#F59E0B', fillColor: '#fff', fillOpacity: 1, weight: 2 }} />
        ))}

        {/* Kaydedilmiş çizgi / poligon */}
        {tempShapes.map(sh => {
          const shapePopup = (
            <Popup>
              <strong>{sh.name}</strong> <span className="text-[10px] text-amber-600">(taslak)</span><br />
              <span className="text-xs text-gray-500">{sh.period}</span>
              {sh.siteType !== 'Yok' && <><br /><span className="text-xs text-gray-400">Koruma: {sh.siteType}</span></>}
              {sh.tescil === 'Var' && <><br /><span className="text-xs text-blue-500">Tescilli</span></>}
              {sh.description && <><br /><span className="text-xs">{sh.description}</span></>}
              {sh.publication && <><br /><span className="text-xs text-gray-400">Yayın: {sh.publication}</span></>}
              {sh.source && <><br /><span className="text-xs text-gray-400">Kaynak: {sh.source}</span></>}
              {sh.photos.length > 0 && <div className="flex gap-1 mt-1 flex-wrap">{sh.photos.map((url, i) => <img key={i} src={url} alt="" className="w-10 h-10 object-cover rounded border border-gray-200" />)}</div>}
            </Popup>
          )
          return sh.type === 'line' ? (
            <Polyline key={sh.id} positions={sh.points} pathOptions={{ color: periodColors[sh.period] ?? '#F59E0B', weight: 3 }}>
              {shapePopup}
            </Polyline>
          ) : (
            <Polygon key={sh.id} positions={sh.points} pathOptions={{ color: periodColors[sh.period] ?? '#F59E0B', fillColor: periodColors[sh.period] ?? '#F59E0B', fillOpacity: 0.2, weight: 2.5 }}>
              {shapePopup}
            </Polygon>
          )
        })}
      </MapContainer>
    </div>
  )
}
