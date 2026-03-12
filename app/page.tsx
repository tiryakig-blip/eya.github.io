'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Map, FileText, Image as ImageIcon, Video, ArrowRight, ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { photos, MAHALLE_LIST, toSlug } from '@/lib/mockData'
import clsx from 'clsx'

// ── Animated Counter ────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let start = 0
      const step = target / 60
      const interval = setInterval(() => {
        start += step
        if (start >= target) { setVal(target); clearInterval(interval) }
        else setVal(Math.floor(start))
      }, 16)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref} className="stat-number">{val.toLocaleString()}{suffix}</span>
}

// ── Module Card ─────────────────────────────────────────────────────────────
function ModuleCard({ icon: Icon, title, desc, href, color }: {
  icon: React.ElementType; title: string; desc: string; href: string; color: string
}) {
  return (
    <Link href={href} className="group block">
      <div className="card-hover module-card-gradient border border-sand/60 rounded-sm p-7 h-full bg-white/60 backdrop-blur-sm">
        <div className={clsx('w-12 h-12 rounded-sm flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110', color)}>
          <Icon size={22} className="text-white" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-obsidian mb-2 group-hover:text-gold transition-colors">{title}</h3>
        <p className="text-stone text-sm leading-relaxed mb-4">{desc}</p>
        <span className="flex items-center gap-1 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Görüntüle <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const { t, locale } = useI18n()

  const modules = [
    { icon: Map,       href: '/harita',   color: 'bg-emerald-700', ...t.modules.map },
    { icon: FileText,  href: '/belgeler', color: 'bg-gold',        ...t.modules.documents },
    { icon: ImageIcon, href: '/galeri',   color: 'bg-terra',       ...t.modules.gallery },
    { icon: Video,     href: '/videolar', color: 'bg-stone-700',   ...t.modules.videos },
  ]

  const stats = [
    { label: t.stats.excavations, value: 5,    suffix: '' },
    { label: t.stats.findings,    value: 2847,  suffix: '+' },
    { label: t.stats.documents,   value: 340,   suffix: '+' },
    { label: t.stats.years,       value: 8,     suffix: '' },
  ]

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-obsidian">
          <Image
            src="/hero.jpg"
            alt="Hero background"
            fill
            className="object-cover opacity-45"
            priority
          />
          <div className="hero-overlay absolute inset-0" />
          {/* Animated grain texture */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
          />
        </div>

        {/* Gold line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block border border-gold/40 text-gold text-[10px] tracking-[0.3em] uppercase px-4 py-1.5 mb-6 animate-fade-in">
            {locale === 'tr' ? 'Bilimsel Araştırma Projesi' : 'Scientific Research Project'}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-4 animate-fade-up">
            {t.hero.title}
          </h1>
          <p className="text-gold text-lg md:text-xl font-serif italic mb-6 animate-fade-up delay-100">
            {t.hero.subtitle}
          </p>
          <p className="text-sand/75 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
            <Link href="/harita" className="btn-gold">
              {t.hero.viewMap}
            </Link>
            <Link href="/belgeler" className="btn-outline">
              {t.hero.explore}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-bounce">
          <ChevronDown size={18} />
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section className="bg-obsidian border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ label, value, suffix }) => (
            <div key={label} className="text-center">
              <div className="font-serif text-4xl md:text-5xl font-bold text-gold mb-1">
                <Counter target={value} suffix={suffix} />
              </div>
              <p className="text-sand/60 text-sm tracking-wide uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MODULES ──────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{locale === 'tr' ? 'Veri Platformu' : 'Data Platform'}</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-obsidian">
              {locale === 'tr' ? 'Araştırma Modülleri' : 'Research Modules'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map(m => (
              <ModuleCard key={m.href} icon={m.icon} title={m.title} desc={m.desc} href={m.href} color={m.color} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MAHALLELER ──────────────────────────────────────────── */}
      <section className="bg-parchment-dark py-20 px-4 border-y border-sand/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{locale === 'tr' ? 'Elmalı İlçesi' : 'Elmalı District'}</p>
              <h2 className="font-serif text-3xl font-bold text-obsidian">{t.recent.title}</h2>
              <p className="text-stone mt-1 text-sm">{t.recent.subtitle}</p>
            </div>
            <Link href="/harita" className="hidden sm:flex items-center gap-1 text-gold text-sm font-medium hover:gap-2 transition-all">
              {t.recent.viewAll} <ArrowRight size={14} />
            </Link>
          </div>

          <div id="mahalleler" className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {MAHALLE_LIST.map(m => (
              <Link key={m} href={`/mahalleler/${toSlug(m)}`} className="bg-white border border-sand/60 rounded-sm px-3 py-2 text-center hover:border-gold hover:shadow-sm transition-all group">
                <span className="text-obsidian text-xs font-medium group-hover:text-gold transition-colors">{m}</span>
              </Link>
            ))}
          </div>

          <p className="text-stone/50 text-xs mt-6 text-center">
            {locale === 'tr' ? `Toplam ${MAHALLE_LIST.length} mahalle` : `${MAHALLE_LIST.length} neighborhoods in total`}
          </p>
        </div>
      </section>

      {/* ── PHOTO PREVIEW ────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{locale === 'tr' ? 'Görsel Arşiv' : 'Visual Archive'}</p>
              <h2 className="font-serif text-3xl font-bold text-obsidian">{t.nav.gallery}</h2>
            </div>
            <Link href="/galeri" className="hidden sm:flex items-center gap-1 text-gold text-sm font-medium hover:gap-2 transition-all">
              {t.recent.viewAll} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.slice(0, 8).map(photo => (
              <Link href="/galeri" key={photo.id} className="group relative overflow-hidden rounded-sm aspect-square bg-sand/30">
                <Image
                  src={photo.thumb}
                  alt={locale === 'tr' ? photo.title : photo.titleEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/50 transition-all duration-300 flex items-end">
                  <p className="text-white text-xs p-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    {locale === 'tr' ? photo.title : photo.titleEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="relative bg-obsidian py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://picsum.photos/seed/cta-arch/1200/400" alt="" fill className="object-cover" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">
            {locale === 'tr' ? 'Araştırmaya Katkıda Bulunun' : 'Contribute to Research'}
          </h2>
          <p className="text-sand/70 mb-8 text-sm leading-relaxed">
            {locale === 'tr'
              ? 'Proje hakkında daha fazla bilgi almak veya araştırmaya katkıda bulunmak için ekibimizle iletişime geçin.'
              : 'Contact our team to learn more about the project or to contribute to the research.'}
          </p>
          <Link href="/hakkinda" className="btn-gold">
            {t.about.contact}
          </Link>
        </div>
      </section>
    </>
  )
}
