'use client'

import { useState, useMemo } from 'react'
import { Search, Download, Eye, FileText, Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { documents } from '@/lib/mockData'
import clsx from 'clsx'

const categoryIcons: Record<string, string> = {
  report: '📋', article: '📄', thesis: '🎓', inventory: '📦', conference: '🎤',
}

const categoryColors: Record<string, string> = {
  report:     'bg-emerald-900/40 text-emerald-400 border-emerald-800',
  article:    'bg-blue-900/40 text-blue-400 border-blue-800',
  thesis:     'bg-purple-900/40 text-purple-400 border-purple-800',
  inventory:  'bg-amber-900/40 text-amber-400 border-amber-800',
  conference: 'bg-rose-900/40 text-rose-400 border-rose-800',
}

// ── PDF Preview Modal ─────────────────────────────────────────────────────────
function PreviewModal({ doc, locale, t, onClose }: {
  doc: typeof documents[0]; locale: string; t: { documents: typeof import('@/lib/translations').translations.tr.documents }; onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lightbox-backdrop bg-obsidian/70" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-sand">
          <div>
            <h2 className="font-serif text-obsidian font-semibold text-base">{locale === 'tr' ? doc.title : doc.titleEn}</h2>
            <p className="text-stone text-xs mt-0.5">{doc.authors.join(', ')}</p>
          </div>
          <button onClick={onClose} className="text-stone hover:text-obsidian p-1">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          {/* Simulated PDF preview */}
          <div className="bg-sand/30 border border-sand rounded aspect-[3/4] mb-4 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col p-8 gap-3">
              <div className="h-3 bg-sand/80 rounded w-3/4 mx-auto" />
              <div className="h-2 bg-sand/60 rounded w-1/2 mx-auto" />
              <div className="h-px bg-sand mt-2" />
              {[...Array(12)].map((_, i) => (
                <div key={i} className={clsx('h-2 rounded', i % 5 === 4 ? 'w-3/4' : 'w-full')}
                  style={{ backgroundColor: `rgba(184,134,11,${0.06 + (i % 3) * 0.03})` }} />
              ))}
            </div>
            <FileText size={36} className="text-stone/20 absolute" />
            <span className="text-stone/40 text-xs absolute bottom-4">PDF Önizleme — Prototip</span>
          </div>
          <div className="bg-parchment-dark rounded p-4 text-sm text-stone leading-relaxed">
            <p className="font-semibold text-obsidian text-xs mb-1 uppercase tracking-wide">
              {locale === 'tr' ? 'Özet' : 'Abstract'}
            </p>
            {locale === 'tr' ? doc.abstract : doc.abstractEn}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
            <div className="bg-sand/30 rounded p-3 text-center">
              <p className="text-stone/60">{t.documents.year}</p>
              <p className="font-bold text-obsidian text-lg">{doc.year}</p>
            </div>
            <div className="bg-sand/30 rounded p-3 text-center">
              <p className="text-stone/60">{t.documents.pages}</p>
              <p className="font-bold text-obsidian text-lg">{doc.pages}</p>
            </div>
            <div className="bg-sand/30 rounded p-3 text-center">
              <p className="text-stone/60">{t.documents.size}</p>
              <p className="font-bold text-obsidian text-lg">{doc.size}</p>
            </div>
          </div>
          <button className="btn-gold w-full mt-4 text-sm flex items-center justify-center gap-2">
            <Download size={14} /> {t.documents.download} PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BelgelerPage() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [preview, setPreview] = useState<typeof documents[0] | null>(null)

  const categories = [
    { key: 'all',        label: t.documents.categories.all },
    { key: 'report',     label: t.documents.categories.report },
    { key: 'article',    label: t.documents.categories.article },
    { key: 'thesis',     label: t.documents.categories.thesis },
    { key: 'inventory',  label: t.documents.categories.inventory },
    { key: 'conference', label: t.documents.categories.conference },
  ]

  const filtered = useMemo(() => {
    let res = documents
    if (category !== 'all') res = res.filter(d => d.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      res = res.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.titleEn.toLowerCase().includes(q) ||
        d.authors.join(' ').toLowerCase().includes(q)
      )
    }
    return [...res].sort((a, b) => {
      if (sort === 'newest')  return b.year - a.year
      if (sort === 'oldest')  return a.year - b.year
      if (sort === 'az')      return a.title.localeCompare(b.title)
      if (sort === 'za')      return b.title.localeCompare(a.title)
      return 0
    })
  }, [category, search, sort])

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      {/* Page Header */}
      <div className="bg-obsidian px-4 py-12 text-center border-b border-white/10">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{locale === 'tr' ? 'Araştırma Arşivi' : 'Research Archive'}</p>
        <h1 className="font-serif text-white text-3xl md:text-4xl font-bold">{t.documents.title}</h1>
        <p className="text-sand/60 mt-2 text-sm">{t.documents.subtitle}</p>
        <div className="mt-4 text-sand/40 text-xs">
          {documents.length} {locale === 'tr' ? 'belge' : 'documents'}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50" />
            <input
              type="text"
              placeholder={t.documents.search}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-sand/80 bg-white rounded-sm text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 text-obsidian"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone/40 hover:text-stone">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 border border-sand/80 bg-white rounded-sm text-sm focus:outline-none focus:border-gold text-obsidian cursor-pointer"
            >
              <option value="newest">{t.documents.sort.newest}</option>
              <option value="oldest">{t.documents.sort.oldest}</option>
              <option value="az">{t.documents.sort.az}</option>
              <option value="za">{t.documents.sort.za}</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone pointer-events-none" />
          </div>

          {/* View mode */}
          <div className="flex border border-sand/80 rounded-sm overflow-hidden">
            {(['grid', 'list'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={clsx('px-4 py-2.5 text-xs font-medium transition-colors',
                  viewMode === mode ? 'bg-obsidian text-white' : 'bg-white text-stone hover:bg-sand/20'
                )}
              >
                {mode === 'grid' ? '⊞' : '≡'}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={clsx(
                'px-4 py-1.5 text-sm rounded-sm border transition-colors',
                category === key
                  ? 'bg-obsidian text-white border-obsidian'
                  : 'bg-white text-stone border-sand/70 hover:border-stone hover:text-obsidian'
              )}
            >
              {key !== 'all' && <span className="mr-1.5">{categoryIcons[key]}</span>}
              {label}
              {key !== 'all' && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  ({documents.filter(d => d.category === key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-stone text-xs mb-5">
          {filtered.length} {locale === 'tr' ? 'sonuç' : 'results'}
          {search && ` — "${search}"`}
        </p>

        {/* Document list/grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone">
            <FileText size={40} className="mx-auto mb-3 opacity-20" />
            <p>{t.documents.noResults}</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(doc => (
              <div key={doc.id} className="card-hover bg-white border border-sand/70 rounded-sm overflow-hidden flex flex-col">
                {/* Document preview thumb */}
                <div className="h-28 bg-gradient-to-br from-sand/40 to-parchment-dark flex items-center justify-center border-b border-sand/50 relative">
                  <FileText size={32} className="text-gold/40" />
                  <span className="absolute top-2 left-2">
                    <span className={clsx('text-[10px] px-2 py-0.5 rounded-full border', categoryColors[doc.category])}>
                      {categoryIcons[doc.category]} {locale === 'tr' ? categories.find(c => c.key === doc.category)?.label : doc.category}
                    </span>
                  </span>
                  <span className="absolute top-2 right-2 text-[10px] bg-obsidian/70 text-sand px-2 py-0.5 rounded">
                    {doc.year}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-serif text-obsidian text-sm font-semibold leading-snug mb-1 line-clamp-2">
                    {locale === 'tr' ? doc.title : doc.titleEn}
                  </h3>
                  <p className="text-stone/70 text-xs mb-3 line-clamp-1">{doc.authors.join(', ')}</p>
                  <p className="text-stone text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
                    {locale === 'tr' ? doc.abstract : doc.abstractEn}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-stone/60 border-t border-sand/50 pt-3">
                    <span>{doc.pages} {t.documents.pages}</span>
                    <span>{doc.size} {t.documents.size}</span>
                  </div>
                </div>
                <div className="flex border-t border-sand/50">
                  <button
                    onClick={() => setPreview(doc)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-stone hover:bg-sand/20 hover:text-obsidian transition-colors border-r border-sand/50"
                  >
                    <Eye size={12} /> {t.documents.preview}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-gold hover:bg-gold/5 transition-colors font-medium">
                    <Download size={12} /> {t.documents.download}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(doc => (
              <div key={doc.id} className="card-hover bg-white border border-sand/70 rounded-sm flex items-center gap-4 px-4 py-3">
                <div className="w-10 h-10 shrink-0 bg-sand/30 rounded flex items-center justify-center text-xl">
                  {categoryIcons[doc.category]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-obsidian text-sm truncate">{locale === 'tr' ? doc.title : doc.titleEn}</h3>
                  <p className="text-stone text-xs truncate">{doc.authors.join(', ')} · {doc.year}</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-stone/60 shrink-0">
                  <span>{doc.pages}s</span>
                  <span>{doc.size}MB</span>
                  <span className={clsx('px-2 py-0.5 rounded-full border text-[10px]', categoryColors[doc.category])}>
                    {locale === 'tr' ? categories.find(c => c.key === doc.category)?.label : doc.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setPreview(doc)} className="p-1.5 text-stone hover:text-obsidian transition-colors">
                    <Eye size={15} />
                  </button>
                  <button className="p-1.5 text-gold hover:text-gold-dark transition-colors">
                    <Download size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview modal */}
      {preview && (
        <PreviewModal doc={preview} locale={locale} t={t} onClose={() => setPreview(null)} />
      )}
    </div>
  )
}
