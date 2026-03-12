'use client'

import Image from 'next/image'
import { Mail, Phone, MapPin, ExternalLink, Users, Building2, Target } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { teamMembers } from '@/lib/mockData'

const institutions = [
  { name: 'Akdeniz Üniversitesi', nameEn: 'Akdeniz University', dept: 'Edebiyat Fakültesi, Arkeoloji Bölümü', deptEn: 'Faculty of Letters, Department of Archaeology', logo: '🏛' },
  { name: 'Antalya Kültürel Miras Derneği (ANKA)', nameEn: 'Antalya Cultural Heritage Association (ANKA)', dept: '', deptEn: '', logo: '🏺' },
  { name: 'Başkent Üniversitesi', nameEn: 'Başkent University', dept: '', deptEn: '', logo: '🏛' },
  { name: 'Çanakkale Onsekiz Mart Üniversitesi', nameEn: 'Çanakkale Onsekiz Mart University', dept: '', deptEn: '', logo: '🏛' },
  { name: 'Elmalı Belediyesi', nameEn: 'Elmalı Municipality', dept: '', deptEn: '', logo: '🏙' },
  { name: 'Elmalı Müze Müdürlüğü', nameEn: 'Elmalı Museum Directorate', dept: '', deptEn: '', logo: '🏛' },
  { name: 'Koç Üniversitesi Akdeniz Medeniyetleri Araştırma Merkezi', nameEn: 'Koç University Research Center for Anatolian Civilizations', dept: '', deptEn: '', logo: '🏛' },
]

export default function HakkindaPage() {
  const { t, locale } = useI18n()

  return (
    <div className="pt-16 min-h-screen bg-parchment">
      {/* Hero */}
      <div className="bg-obsidian px-4 py-16 text-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="https://picsum.photos/seed/about-bg/1200/400" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">2016–{new Date().getFullYear()}</p>
          <h1 className="font-serif text-white text-3xl md:text-4xl font-bold">{t.about.title}</h1>
          <p className="text-sand/60 mt-2 text-sm">{t.about.subtitle}</p>
        </div>
      </div>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center">
            <Target size={16} className="text-white" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-obsidian">{t.about.mission}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-stone text-sm leading-relaxed">
          <p>
            {locale === 'tr'
              ? 'Araştırma projemiz, Orta Anadolu\'da Kalkolitik dönemden Roma dönemine uzanan geniş bir kronolojik yelpazede arkeolojik kazılar ve yüzey araştırmaları yürütmektedir. Temel amacımız, bölgenin kültürel katmanlarını sistematik biçimde belgelemek ve bilim dünyasıyla kamuoyuyla paylaşmaktır.'
              : "Our research project conducts archaeological excavations and surface surveys in Central Anatolia across a broad chronological range from the Chalcolithic period to the Roman era. Our primary goal is to systematically document the region's cultural layers and share them with the academic community and the public."}
          </p>
          <p>
            {locale === 'tr'
              ? 'CBS (Coğrafi Bilgi Sistemleri), uzaktan algılama ve arkeometrik analizleri entegre eden çok disiplinli yaklaşımımız, geleneksel arkeolojik yöntemleri tamamlayarak bölgenin tarihsel coğrafyasını daha kapsamlı biçimde anlamamıza katkı sağlamaktadır.'
              : 'Our multidisciplinary approach integrating GIS (Geographic Information Systems), remote sensing, and archaeometric analyses complements traditional archaeological methods and contributes to a more comprehensive understanding of the region\'s historical geography.'}
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-12">
          <h3 className="font-serif text-xl font-bold text-obsidian mb-6">{locale === 'tr' ? 'Proje Tarihçesi' : 'Project Timeline'}</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-sand" />
            <div className="space-y-6">
              {[
                { year: '2016', tr: 'Projenin başlaması ve Sektör C ile D\'nin açılması.', en: 'Project launch and opening of Sectors C and D.' },
                { year: '2018', tr: 'Ana Kazı Alanı A\'nın (Sektör A) çalışmalarına başlandı.', en: 'Work began at Main Excavation Site A (Sector A).' },
                { year: '2020', tr: 'Sektör B Nekropol kazıları başladı; TÜBİTAK desteği alındı.', en: 'Sector B Necropolis excavations began; TÜBİTAK support received.' },
                { year: '2022', tr: 'Sektör E Tapınak alanı tespit edildi; alan yüzey araştırması tamamlandı.', en: 'Sector E temple site identified; full surface survey completed.' },
                { year: '2023', tr: 'Dijital arşiv platformu hayata geçirildi; 2847 buluntu kayıt altına alındı.', en: 'Digital archive platform launched; 2847 findings recorded.' },
              ].map(item => (
                <div key={item.year} className="flex gap-6 items-start pl-10 relative">
                  <div className="absolute left-2 top-1 w-4 h-4 bg-gold rounded-full border-2 border-parchment -translate-x-1/2" />
                  <div>
                    <span className="font-bold text-gold text-sm">{item.year}</span>
                    <p className="text-stone text-sm mt-0.5">{locale === 'tr' ? item.tr : item.en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-parchment-dark border-y border-sand/60 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-terra rounded-sm flex items-center justify-center">
              <Users size={16} className="text-white" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-obsidian">{t.about.team}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {teamMembers.map(member => (
              <div key={member.id} className="card-hover bg-white border border-sand/70 rounded-sm p-4 text-center">
                <div className="relative w-16 h-16 mx-auto mb-3 overflow-hidden rounded-full border-2 border-sand">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-obsidian text-xs leading-tight mb-0.5">{member.name}</h3>
                <p className="text-gold text-[10px] mb-0.5">{locale === 'tr' ? member.role : member.roleEn}</p>
                <p className="text-stone/60 text-[10px]">{locale === 'tr' ? member.specialization : member.specializationEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-stone rounded-sm flex items-center justify-center">
              <Building2 size={16} className="text-white" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-obsidian">{t.about.institutions}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {institutions.map(inst => (
              <div key={inst.name} className="card-hover bg-white border border-sand/70 rounded-sm p-5 flex items-center gap-4">
                <div className="text-3xl shrink-0">{inst.logo}</div>
                <div>
                  <h3 className="font-semibold text-obsidian text-sm">{locale === 'tr' ? inst.name : inst.nameEn}</h3>
                  <p className="text-stone/70 text-xs mt-0.5">{locale === 'tr' ? inst.dept : inst.deptEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-obsidian py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-white text-2xl font-bold mb-8 text-center">{t.about.contact}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin, label: locale === 'tr' ? 'Adres' : 'Address',
                content: 'Akdeniz Üniversitesi, Edebiyat Fakültesi\nArkeoloji Bölümü\n07070 / Antalya',
              },
              {
                icon: Mail, label: 'E-posta / Email',
                content: 'gtiryaki@akdeniz.edu.tr',
              },
              {
                icon: Phone, label: locale === 'tr' ? 'Telefon' : 'Phone',
                content: '+90 242 310 61 93',
              },
            ].map(({ icon: Icon, label, content }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={15} className="text-gold" />
                  <span className="text-sand/60 text-xs uppercase tracking-wide">{label}</span>
                </div>
                <p className="text-sand text-sm whitespace-pre-line leading-relaxed">{content}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sand/40 text-xs">
              {locale === 'tr'
                ? 'Araştırma işbirlikleri ve veri paylaşımı için lütfen proje direktörüyle iletişime geçin.'
                : 'Please contact the project director for research collaborations and data sharing.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
