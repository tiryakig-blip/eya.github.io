'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { X, MapPin, Calendar, Ruler, Tag, Info } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { excavationSites, findingPoints } from '@/lib/mockData'
import clsx from 'clsx'

const MapClient = dynamic(() => import('@/components/MapClient'), { ssr: false })

type SelectedFeature = {
  type: 'excavation' | 'finding'
  data: typeof excavationSites[0] | typeof findingPoints[0]
} | null

type LayerLeaf  = { key: string; label: string; labelEn: string; color: string }
type LayerChild = LayerLeaf & { children?: LayerLeaf[] }
type LayerGroup = { key: string; label: string; labelEn: string; color: string; children?: LayerChild[] }

const LAYER_GROUPS: LayerGroup[] = [
  { key: 'prehistoric',     color: '#795548', label: 'Prehistorik Dönem', labelEn: 'Prehistoric Period',
    children: [
      { key: 'paleolithic', label: 'Paleolitik Çağ', labelEn: 'Paleolithic Age', color: '#6D4C41' },
      { key: 'neolithic',   label: 'Neolitik Çağ',   labelEn: 'Neolithic Age',   color: '#8D6E63' },
    ]
  },
  { key: 'protohistoric',   color: '#FF8F00', label: 'Protohistorik Dönem', labelEn: 'Protohistoric Period',
    children: [
      { key: 'chalcolithic', label: 'Kalkolitik Çağ', labelEn: 'Chalcolithic Age', color: '#BF8D3C' },
      { key: 'bronze',       label: 'Tunç Çağı',      labelEn: 'Bronze Age',       color: '#DAA520' },
      { key: 'iron',         label: 'Demir Çağı',     labelEn: 'Iron Age',         color: '#8B4513',
        children: [
          { key: 'iron_pre_achaemenid', label: 'Akhamenid Öncesi Dönem', labelEn: 'Pre-Achaemenid Period', color: '#A0522D' },
          { key: 'iron_achaemenid',     label: 'Akhamenid Dönemi',       labelEn: 'Achaemenid Period',     color: '#CD853F' },
        ]
      },
    ]
  },
  { key: 'hellenistic_roman', color: '#4169E1', label: 'Hellenistik ve Roma Dönemleri', labelEn: 'Hellenistic and Roman Periods' },
  { key: 'byzantine',         color: '#9C27B0', label: 'Doğu Roma Dönemi',              labelEn: 'Byzantine Period' },
  { key: 'ottoman',           color: '#2E7D32', label: 'Osmanlı Dönemi',                labelEn: 'Ottoman Period' },
  { key: 'republic',          color: '#C62828', label: 'Cumhuriyet Dönemi',             labelEn: 'Republican Period' },
  { key: 'registered_sites',  color: '#0288D1', label: 'Tescilli Sit Alanları',          labelEn: 'Registered Archaeological Sites' },
  { key: 'destruction_areas', color: '#E53935', label: 'Tahribat Alanları',              labelEn: 'Destruction Areas' },
]

export default function HaritaPage() {
  const { t, locale } = useI18n()
  const [layers, setLayers] = useState<Record<string, boolean>>({
    prehistoric: false, paleolithic: false, neolithic: false,
    protohistoric: false, chalcolithic: false, bronze: false,
    iron: false, iron_pre_achaemenid: false, iron_achaemenid: false,
    hellenistic_roman: false, byzantine: false, ottoman: false, republic: false,
    registered_sites: false, destruction_areas: false,
  })
  const [selected, setSelected] = useState<SelectedFeature>(null)

  const toggleLayer = (key: string) => {
    setLayers(prev => {
      const next = { ...prev, [key]: !prev[key] }

      // Prehistorik → alt katmanları güncelle
      if (key === 'prehistoric') {
        next.paleolithic = next.neolithic = next.prehistoric
      }
      // Prehistorik alt katmanları → üst katmanı güncelle
      if (key === 'paleolithic' || key === 'neolithic') {
        next.prehistoric = next.paleolithic && next.neolithic
      }

      // Protohistorik → tüm torunları güncelle
      if (key === 'protohistoric') {
        next.chalcolithic = next.bronze = next.iron = next.iron_pre_achaemenid = next.iron_achaemenid = next.protohistoric
      }
      // Kalkolitik → protohistorik güncelle
      if (key === 'chalcolithic') {
        next.protohistoric = next.chalcolithic && next.bronze && next.iron
      }
      // Tunç → protohistorik güncelle
      if (key === 'bronze') {
        next.protohistoric = next.chalcolithic && next.bronze && next.iron
      }
      // Demir Çağı → alt katmanları güncelle
      if (key === 'iron') {
        next.iron_pre_achaemenid = next.iron_achaemenid = next.iron
        next.protohistoric = next.chalcolithic && next.bronze && next.iron
      }
      // Demir Çağı alt katmanları → üst katmanları güncelle
      if (key === 'iron_pre_achaemenid' || key === 'iron_achaemenid') {
        next.iron = next.iron_pre_achaemenid && next.iron_achaemenid
        next.protohistoric = next.chalcolithic && next.bronze && next.iron
      }

      return next
    })
  }

  const isExcavation = (d: SelectedFeature) => d?.type === 'excavation'

  return (
    <div className="flex flex-col h-screen pt-16">
      {/* Page Header */}
      <div className="bg-obsidian px-4 py-4 border-b border-white/10 shrink-0">
        <h1 className="font-serif text-white text-lg font-semibold">{t.map.title}</h1>
        <p className="text-sand/50 text-xs mt-0.5">{t.map.subtitle}</p>
      </div>

      {/* Map + Panels */}
      <div className="flex-1 flex overflow-hidden">

        {/* Layer Control Panel — sabit sol */}
        <aside className="w-56 bg-obsidian/95 border-r border-white/10 flex flex-col shrink-0 overflow-y-auto">
            <div className="px-4 py-3 border-b border-white/10">
              <span className="text-white text-sm font-semibold">{t.map.layers.title}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {LAYER_GROUPS.map((group) => (
                <div key={group.key}>
                  {/* Ana katman */}
                  <label className="flex items-center gap-2.5 px-2 py-2 rounded cursor-pointer hover:bg-white/5 group">
                    <input type="checkbox" checked={layers[group.key]} onChange={() => toggleLayer(group.key)} className="sr-only" />
                    <div className={clsx('w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors',
                      layers[group.key] ? 'border-transparent' : 'border-white/30'
                    )} style={{ backgroundColor: layers[group.key] ? group.color : undefined }}>
                      {layers[group.key] && <svg viewBox="0 0 12 12" className="w-2 h-2 fill-white"><path d="M1 6l3.5 3.5L11 2"/></svg>}
                      {!layers[group.key] && group.children && (layers.bronze || layers.iron) &&
                        <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: group.color }} />
                      }
                    </div>
                    <span className="text-sand/80 text-xs group-hover:text-white transition-colors leading-tight flex-1">
                      {locale === 'tr' ? group.label : group.labelEn}
                    </span>
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
                  </label>
                  {/* Alt katmanlar (2. seviye) */}
                  {group.children && (
                    <div className="ml-4 space-y-0.5 mb-1">
                      {group.children.map(child => (
                        <div key={child.key}>
                          <label className="flex items-center gap-2.5 px-2 py-1.5 rounded cursor-pointer hover:bg-white/5 group">
                            <input type="checkbox" checked={layers[child.key]} onChange={() => toggleLayer(child.key)} className="sr-only" />
                            <div className={clsx('w-3 h-3 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors',
                              layers[child.key] ? 'border-transparent' : 'border-white/20'
                            )} style={{ backgroundColor: layers[child.key] ? child.color : undefined }}>
                              {layers[child.key] && <svg viewBox="0 0 12 12" className="w-1.5 h-1.5 fill-white"><path d="M1 6l3.5 3.5L11 2"/></svg>}
                              {!layers[child.key] && child.children && child.children.some(g => layers[g.key]) &&
                                <div className="w-1 h-1 rounded-sm" style={{ backgroundColor: child.color }} />
                              }
                            </div>
                            <span className="text-sand/60 text-[11px] group-hover:text-white transition-colors flex-1">
                              {locale === 'tr' ? child.label : child.labelEn}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: child.color }} />
                          </label>
                          {/* Alt-alt katmanlar (3. seviye) */}
                          {child.children && (
                            <div className="ml-4 space-y-0.5 mb-0.5">
                              {child.children.map(leaf => (
                                <label key={leaf.key} className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-white/5 group">
                                  <input type="checkbox" checked={layers[leaf.key]} onChange={() => toggleLayer(leaf.key)} className="sr-only" />
                                  <div className={clsx('w-2.5 h-2.5 rounded-sm border flex items-center justify-center shrink-0 transition-colors',
                                    layers[leaf.key] ? 'border-transparent' : 'border-white/15'
                                  )} style={{ backgroundColor: layers[leaf.key] ? leaf.color : undefined }}>
                                    {layers[leaf.key] && <svg viewBox="0 0 12 12" className="w-1.5 h-1.5 fill-white"><path d="M1 6l3.5 3.5L11 2"/></svg>}
                                  </div>
                                  <span className="text-sand/50 text-[10px] group-hover:text-white transition-colors flex-1 leading-tight">
                                    {locale === 'tr' ? leaf.label : leaf.labelEn}
                                  </span>
                                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: leaf.color }} />
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="border-t border-white/10 p-3">
              <p className="text-sand/40 text-[10px] uppercase tracking-wider mb-2">{t.map.legend.title}</p>
              <div className="space-y-1.5 text-[10px] text-sand/60">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-obsidian" />
                  <span>{locale === 'tr' ? 'Aktif Kazı' : 'Active Excavation'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-slate-400 bg-obsidian" />
                  <span>{locale === 'tr' ? 'Tamamlandı' : 'Completed'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                  <span>{locale === 'tr' ? 'Buluntu Noktası' : 'Finding Point'}</span>
                </div>
              </div>
            </div>
          </aside>

        {/* Map */}
        <div className="flex-1 relative">
          <MapClient selected={selected} onSelect={setSelected} layers={layers} />
        </div>

        {/* Info Panel */}
        {selected ? (
          <aside className="w-72 bg-obsidian/95 border-l border-white/10 flex flex-col overflow-y-auto shrink-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="text-white text-sm font-semibold">
                {isExcavation(selected) ? (locale === 'tr' ? 'Kazı Alanı' : 'Excavation Site') : (locale === 'tr' ? 'Buluntu' : 'Finding')}
              </span>
              <button onClick={() => setSelected(null)} className="text-sand/50 hover:text-white">
                <X size={14} />
              </button>
            </div>
            <div className="p-4">
              {isExcavation(selected) ? (
                (() => {
                  const s = selected!.data as typeof excavationSites[0]
                  return (
                    <>
                      <h2 className="font-serif text-white text-base font-semibold mb-1">{locale === 'tr' ? s.name : s.nameEn}</h2>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={clsx('text-[10px] px-2 py-0.5 rounded-full font-medium',
                          s.status === 'active' ? 'bg-green-900/50 text-green-400' : 'bg-slate-700 text-slate-400'
                        )}>
                          {s.status === 'active' ? t.map.info.active : t.map.info.completed}
                        </span>
                      </div>
                      <p className="text-sand/60 text-xs leading-relaxed mb-4">
                        {locale === 'tr' ? s.description : s.descriptionEn}
                      </p>
                      <div className="space-y-2.5 text-xs">
                        {[
                          { icon: Tag,      label: t.map.info.period,  val: locale === 'tr' ? s.period : (s as typeof excavationSites[0]).periodEn },
                          { icon: Ruler,    label: t.map.info.depth,   val: s.depth },
                          { icon: Calendar, label: locale === 'tr' ? 'Başlangıç' : 'Start Year', val: String(s.startYear) },
                          { icon: MapPin,   label: t.map.info.coordinates, val: `${s.lat.toFixed(4)}, ${s.lng.toFixed(4)}` },
                        ].map(({ icon: Icon, label, val }) => (
                          <div key={label} className="flex items-center gap-2 text-sand/70">
                            <Icon size={12} className="text-gold shrink-0" />
                            <span className="text-sand/40 shrink-0">{label}:</span>
                            <span className="font-medium text-sand">{val}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )
                })()
              ) : (
                (() => {
                  const f = selected!.data as typeof findingPoints[0]
                  return (
                    <>
                      <h2 className="font-serif text-white text-base font-semibold mb-4">{locale === 'tr' ? f.name : f.nameEn}</h2>
                      <div className="space-y-2.5 text-xs">
                        {[
                          { icon: Tag,      label: t.map.info.period,   val: locale === 'tr' ? f.period : f.periodEn },
                          { icon: Info,     label: t.map.info.category, val: locale === 'tr' ? f.category : f.categoryEn },
                          { icon: Calendar, label: t.map.info.date,     val: f.date },
                          { icon: MapPin,   label: locale === 'tr' ? 'Alan' : 'Site', val: f.site },
                          { icon: MapPin,   label: t.map.info.coordinates, val: `${f.lat.toFixed(4)}, ${f.lng.toFixed(4)}` },
                        ].map(({ icon: Icon, label, val }) => (
                          <div key={label} className="flex items-center gap-2 text-sand/70">
                            <Icon size={12} className="text-gold shrink-0" />
                            <span className="text-sand/40 shrink-0">{label}:</span>
                            <span className="font-medium text-sand">{val}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )
                })()
              )}
            </div>
          </aside>
        ) : (
          <aside className="w-72 bg-obsidian/95 border-l border-white/10 flex items-center justify-center shrink-0">
            <div className="text-sand/40 text-xs px-4 text-center flex flex-col items-center gap-2">
              <Info size={16} />
              {t.map.selectFeature}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
