// ─── Harita Verisi ────────────────────────────────────────────────────────────
export const excavationSites = [
  { id: 1, name: 'Ana Kazı Alanı A', nameEn: 'Main Excavation Site A', lat: 36.7420, lng: 29.9280, period: 'Demir Çağı', periodEn: 'Iron Age', status: 'active', depth: '4.2m', startYear: 2018, description: 'Erken Demir Çağı\'na ait mimari kalıntılar ve çömlekler.', descriptionEn: 'Architectural remains and pottery from the Early Iron Age.' },
  { id: 2, name: 'Sektör B – Nekropol', nameEn: 'Sector B – Necropolis', lat: 36.7360, lng: 29.9340, period: 'Tunç Çağı', periodEn: 'Bronze Age', status: 'active', depth: '6.8m', startYear: 2020, description: 'Geç Tunç Çağı mezar odaları ve adak eşyaları.', descriptionEn: 'Late Bronze Age burial chambers and votive objects.' },
  { id: 3, name: 'Sektör C – Agora', nameEn: 'Sector C – Agora', lat: 36.7480, lng: 29.9210, period: 'Helenistik', periodEn: 'Hellenistic', status: 'completed', depth: '3.1m', startYear: 2016, description: 'Helenistik dönem agora yapısı ve sütun kaideleri.', descriptionEn: 'Hellenistic period agora structure and column bases.' },
  { id: 4, name: 'Sektör D – Roma Villası', nameEn: 'Sector D – Roman Villa', lat: 36.7300, lng: 29.9390, period: 'Roma', periodEn: 'Roman', status: 'completed', depth: '2.5m', startYear: 2015, description: 'M.S. 2. yüzyıla ait Roma villası ve mozaik zeminler.', descriptionEn: '2nd century AD Roman villa with mosaic floors.' },
  { id: 5, name: 'Sektör E – Tapınak', nameEn: 'Sector E – Temple', lat: 36.7530, lng: 29.9250, period: 'Helenistik', periodEn: 'Hellenistic', status: 'active', depth: '5.0m', startYear: 2022, description: 'Helenistik tapınak kompleksi, adak çukurları ve heykel kaidesi.', descriptionEn: 'Hellenistic temple complex with votive pits and statue base.' },
  { id: 6, name: 'Çaltılar Höyüğü', nameEn: 'Çaltılar Mound', lat: 36.7180, lng: 29.9050, period: 'Prehistorik', periodEn: 'Prehistoric', status: 'active', depth: '7.5m', startYear: 2021, description: 'Elmalı ovasının güneybatısında yer alan prehistorik höyük. Kalkolitik ve Erken Tunç Çağı tabakalarına ait çömlekler ve taş aletler ele geçirilmiştir.', descriptionEn: 'Prehistoric mound located southwest of the Elmalı plain. Pottery and stone tools from Chalcolithic and Early Bronze Age layers have been recovered.' },
]

export const findingPoints = [
  { id: 1, name: 'Pişmiş Toprak Figürin', nameEn: 'Terracotta Figurine', lat: 36.7422, lng: 29.9284, category: 'ceramics', categoryEn: 'Ceramics', period: 'Tunç Çağı', periodEn: 'Bronze Age', date: '2021-07-14', site: 'Ana Kazı Alanı A' },
  { id: 2, name: 'Bronz Fibula', nameEn: 'Bronze Fibula', lat: 36.7362, lng: 29.9342, category: 'metal', categoryEn: 'Metal', period: 'Demir Çağı', periodEn: 'Iron Age', date: '2022-06-03', site: 'Sektör B' },
  { id: 3, name: 'Helenistik Amphora', nameEn: 'Hellenistic Amphora', lat: 36.7482, lng: 29.9214, category: 'ceramics', categoryEn: 'Ceramics', period: 'Helenistik', periodEn: 'Hellenistic', date: '2019-08-22', site: 'Sektör C' },
  { id: 4, name: 'Roma Sikkesi', nameEn: 'Roman Coin', lat: 36.7302, lng: 29.9392, category: 'numismatics', categoryEn: 'Numismatics', period: 'Roma', periodEn: 'Roman', date: '2018-05-11', site: 'Sektör D' },
  { id: 5, name: 'Obsidyen Dilgi', nameEn: 'Obsidian Blade', lat: 36.7424, lng: 29.9268, category: 'lithic', categoryEn: 'Lithic', period: 'Kalkolitik', periodEn: 'Chalcolithic', date: '2023-07-29', site: 'Ana Kazı Alanı A' },
  { id: 6, name: 'Kemik İğne', nameEn: 'Bone Needle', lat: 36.7364, lng: 29.9352, category: 'bone', categoryEn: 'Bone', period: 'Tunç Çağı', periodEn: 'Bronze Age', date: '2022-09-05', site: 'Sektör B' },
  { id: 7, name: 'Mermer Heykelcik', nameEn: 'Marble Statuette', lat: 36.7532, lng: 29.9252, category: 'sculpture', categoryEn: 'Sculpture', period: 'Helenistik', periodEn: 'Hellenistic', date: '2023-05-18', site: 'Sektör E' },
  { id: 8, name: 'Altın Küpe', nameEn: 'Gold Earring', lat: 36.7302, lng: 29.9394, category: 'jewelry', categoryEn: 'Jewelry', period: 'Roma', periodEn: 'Roman', date: '2020-06-30', site: 'Sektör D' },
]

// ─── Belgeler ─────────────────────────────────────────────────────────────────
export const documents = [
  { id: 1, title: '2023 Yılı Kazı Sezonu Ön Raporu', titleEn: '2023 Excavation Season Preliminary Report', category: 'report', authors: ['Prof. Dr. Ayşe Kaya', 'Dr. Mehmet Demir'], year: 2023, pages: 142, size: 8.4, abstract: 'Sektör E tapınak alanında yürütülen 2023 kazı sezonuna ait ön bulgular ve stratigrafik değerlendirme.', abstractEn: 'Preliminary findings and stratigraphic assessment of the 2023 excavation season at Sector E temple site.' },
  { id: 2, title: 'Demir Çağı Seramiği: Tipoloji ve Kronoloji', titleEn: 'Iron Age Ceramics: Typology and Chronology', category: 'article', authors: ['Dr. Fatma Yıldız'], year: 2022, pages: 38, size: 3.2, abstract: 'Ana Kazı Alanı A\'dan ele geçen Demir Çağı seramiğinin tipolojik analizi ve bölgesel karşılaştırması.', abstractEn: 'Typological analysis and regional comparison of Iron Age ceramics from Main Excavation Site A.' },
  { id: 3, title: 'Nekropol Alanı Yüzey Araştırması 2021', titleEn: 'Necropolis Surface Survey 2021', category: 'report', authors: ['Dr. Ali Çelik', 'Arş. Gör. Selin Kurt'], year: 2021, pages: 76, size: 5.1, abstract: 'Sektör B nekropol alanının jeofizik tarama ve yüzey araştırması sonuçları.', abstractEn: 'Results of geophysical survey and surface investigation at Sector B necropolis.' },
  { id: 4, title: 'Anadolu Tunç Çağı Yerleşim Örüntüleri', titleEn: 'Anatolian Bronze Age Settlement Patterns', category: 'article', authors: ['Prof. Dr. Hasan Özkan', 'Dr. Leyla Arslan'], year: 2022, pages: 52, size: 4.7, abstract: 'Orta Anadolu\'da Tunç Çağı yerleşim dokusunun CBS analizleri ile değerlendirilmesi.', abstractEn: 'GIS-based evaluation of Bronze Age settlement patterns in Central Anatolia.' },
  { id: 5, title: 'Helenistik Dönem Mimari Analizi – Sektör C', titleEn: 'Hellenistic Period Architectural Analysis – Sector C', category: 'report', authors: ['Dr. Zeynep Başaran'], year: 2020, pages: 98, size: 12.3, abstract: 'Sektör C agora yapısının mimari belgelenmesi ve dönem karşılaştırması.', abstractEn: 'Architectural documentation and period comparison of Sector C agora structure.' },
  { id: 6, title: 'Roma Villası Mozaikleri: İkonografik İnceleme', titleEn: 'Roman Villa Mosaics: An Iconographic Study', category: 'article', authors: ['Prof. Dr. Elif Doğan', 'Dr. Kemal Şahin'], year: 2019, pages: 64, size: 18.9, abstract: 'Sektör D\'de ortaya çıkarılan Roma villasına ait mozaiklerin ikonografik ve teknik incelemesi.', abstractEn: 'Iconographic and technical examination of mosaics from the Roman villa uncovered in Sector D.' },
  { id: 7, title: 'Obsidyen Analizi ve Kaynak Belirleme', titleEn: 'Obsidian Analysis and Source Determination', category: 'article', authors: ['Dr. Burak Aydın', 'Arş. Gör. Naz Kılıç'], year: 2023, pages: 29, size: 2.1, abstract: 'XRF analizi ile obsidyen eserler üzerinde kaynak belirleme çalışması.', abstractEn: 'Source determination study on obsidian artifacts using XRF analysis.' },
  { id: 8, title: 'Arkeoloji ve CBS: Yöntemler', titleEn: 'Archaeology and GIS: Methods', category: 'conference', authors: ['Prof. Dr. Ayşe Kaya'], year: 2023, pages: 18, size: 1.5, abstract: '2023 Ankara Arkeoloji Konferansı\'nda sunulan CBS uygulamaları bildirisi.', abstractEn: 'GIS applications paper presented at 2023 Ankara Archaeology Conference.' },
  { id: 9, title: 'Anadolu\'da Tunç Çağı Metallurjisi (Doktora Tezi)', titleEn: 'Bronze Age Metallurgy in Anatolia (PhD Thesis)', category: 'thesis', authors: ['Dr. Canan Yılmaz'], year: 2021, pages: 312, size: 24.6, abstract: 'Orta Anadolu arkeolojik kontekstlerinden ele geçen metal eserlerin metalurjik analizi.', abstractEn: 'Metallurgical analysis of metal artifacts from Central Anatolian archaeological contexts.' },
  { id: 10, title: 'Buluntu Envanteri 2018–2023', titleEn: 'Findings Inventory 2018–2023', category: 'inventory', authors: ['Araştırma Ekibi'], year: 2023, pages: 540, size: 31.2, abstract: '2018–2023 dönemine ait tüm kayıtlı buluntuların sistematik envanteri.', abstractEn: 'Systematic inventory of all registered findings from the 2018–2023 period.' },
  { id: 11, title: 'Pişmiş Toprak Figürinler: Katalog', titleEn: 'Terracotta Figurines: Catalogue', category: 'inventory', authors: ['Dr. Fatma Yıldız', 'Arş. Gör. Deniz Ak'], year: 2022, pages: 188, size: 22.0, abstract: 'Projede ele geçen pişmiş toprak figürinlerin fotoğraflı katalog çalışması.', abstractEn: 'Photographic catalogue of terracotta figurines recovered during the project.' },
  { id: 12, title: 'Demir Çağı Sosyal Yapısı Üzerine Yeni Kanıtlar', titleEn: 'New Evidence on Iron Age Social Structure', category: 'conference', authors: ['Prof. Dr. Hasan Özkan'], year: 2022, pages: 22, size: 1.8, abstract: '2022 İstanbul Arkeoloji Sempozyumu\'nda sunulan bildiri.', abstractEn: 'Paper presented at the 2022 Istanbul Archaeology Symposium.' },
]

// ─── Galeri ───────────────────────────────────────────────────────────────────
export const photos = [
  { id: 1, title: 'Ana Kazı Alanı Genel Görünüm', titleEn: 'Main Excavation Site Overview', category: 'excavation', src: 'https://picsum.photos/seed/arch1/800/600', thumb: 'https://picsum.photos/seed/arch1/400/300', location: 'Sektör A', photographer: 'Dr. Ali Çelik', date: '2023-07-10', width: 800, height: 600 },
  { id: 2, title: 'Bronz Fibula Buluntu Anı', titleEn: 'Bronze Fibula Discovery', category: 'findings', src: 'https://picsum.photos/seed/arch2/800/600', thumb: 'https://picsum.photos/seed/arch2/400/300', location: 'Sektör B', photographer: 'Arş. Gör. Selin Kurt', date: '2022-06-03', width: 800, height: 600 },
  { id: 3, title: 'Gün Batımında Kazı Alanı', titleEn: 'Excavation Site at Sunset', category: 'landscape', src: 'https://picsum.photos/seed/arch3/1200/600', thumb: 'https://picsum.photos/seed/arch3/400/200', location: 'Genel', photographer: 'Prof. Dr. Ayşe Kaya', date: '2023-08-15', width: 1200, height: 600 },
  { id: 4, title: 'Laboratuvar Analizi – Seramik', titleEn: 'Laboratory Analysis – Ceramics', category: 'lab', src: 'https://picsum.photos/seed/arch4/800/800', thumb: 'https://picsum.photos/seed/arch4/400/400', location: 'Lab', photographer: 'Dr. Fatma Yıldız', date: '2022-11-20', width: 800, height: 800 },
  { id: 5, title: 'Nekropol Kazı Görünümü', titleEn: 'Necropolis Excavation View', category: 'excavation', src: 'https://picsum.photos/seed/arch5/800/600', thumb: 'https://picsum.photos/seed/arch5/400/300', location: 'Sektör B', photographer: 'Dr. Ali Çelik', date: '2023-06-28', width: 800, height: 600 },
  { id: 6, title: 'Araştırma Ekibi 2023', titleEn: 'Research Team 2023', category: 'team', src: 'https://picsum.photos/seed/arch6/900/600', thumb: 'https://picsum.photos/seed/arch6/400/266', location: 'Kamp Alanı', photographer: 'Misafir Fotoğrafçı', date: '2023-07-01', width: 900, height: 600 },
  { id: 7, title: 'Mozaik Zemin Detayı', titleEn: 'Mosaic Floor Detail', category: 'findings', src: 'https://picsum.photos/seed/arch7/800/600', thumb: 'https://picsum.photos/seed/arch7/400/300', location: 'Sektör D', photographer: 'Prof. Dr. Elif Doğan', date: '2019-09-05', width: 800, height: 600 },
  { id: 8, title: 'Hava Fotoğrafı – Kazı Alanları', titleEn: 'Aerial Photo – Excavation Sites', category: 'landscape', src: 'https://picsum.photos/seed/arch8/1200/700', thumb: 'https://picsum.photos/seed/arch8/400/233', location: 'Genel', photographer: 'Drone Operatörü', date: '2023-05-20', width: 1200, height: 700 },
  { id: 9, title: 'Helenistik Sütun Kaidesi', titleEn: 'Hellenistic Column Base', category: 'findings', src: 'https://picsum.photos/seed/arch9/600/800', thumb: 'https://picsum.photos/seed/arch9/300/400', location: 'Sektör C', photographer: 'Dr. Zeynep Başaran', date: '2020-07-14', width: 600, height: 800 },
  { id: 10, title: 'XRF Analizi – Obsidyen', titleEn: 'XRF Analysis – Obsidian', category: 'lab', src: 'https://picsum.photos/seed/arch10/800/600', thumb: 'https://picsum.photos/seed/arch10/400/300', location: 'Lab', photographer: 'Dr. Burak Aydın', date: '2023-04-12', width: 800, height: 600 },
  { id: 11, title: 'Tapınak Temel Duvarları', titleEn: 'Temple Foundation Walls', category: 'excavation', src: 'https://picsum.photos/seed/arch11/900/600', thumb: 'https://picsum.photos/seed/arch11/400/266', location: 'Sektör E', photographer: 'Prof. Dr. Ayşe Kaya', date: '2022-08-03', width: 900, height: 600 },
  { id: 12, title: 'Altın Küpe – Koruma Altında', titleEn: 'Gold Earring – Under Protection', category: 'findings', src: 'https://picsum.photos/seed/arch12/600/600', thumb: 'https://picsum.photos/seed/arch12/300/300', location: 'Müze', photographer: 'Dr. Kemal Şahin', date: '2020-07-01', width: 600, height: 600 },
  { id: 13, title: 'Ekip Toplantısı – Saha', titleEn: 'Team Meeting – Field', category: 'team', src: 'https://picsum.photos/seed/arch13/800/600', thumb: 'https://picsum.photos/seed/arch13/400/300', location: 'Saha', photographer: 'Arş. Gör. Deniz Ak', date: '2023-07-05', width: 800, height: 600 },
  { id: 14, title: 'Stratigrafik Kesit', titleEn: 'Stratigraphic Section', category: 'excavation', src: 'https://picsum.photos/seed/arch14/600/900', thumb: 'https://picsum.photos/seed/arch14/300/450', location: 'Sektör A', photographer: 'Dr. Mehmet Demir', date: '2023-07-22', width: 600, height: 900 },
  { id: 15, title: 'Kuzey Platosundan Manzara', titleEn: 'View from North Plateau', category: 'landscape', src: 'https://picsum.photos/seed/arch15/1200/600', thumb: 'https://picsum.photos/seed/arch15/400/200', location: 'Kuzey', photographer: 'Prof. Dr. Ayşe Kaya', date: '2022-09-10', width: 1200, height: 600 },
  { id: 16, title: 'Seramik Restorasyon Çalışması', titleEn: 'Ceramic Restoration Work', category: 'lab', src: 'https://picsum.photos/seed/arch16/800/600', thumb: 'https://picsum.photos/seed/arch16/400/300', location: 'Lab', photographer: 'Arş. Gör. Naz Kılıç', date: '2022-10-14', width: 800, height: 600 },
]

// ─── Videolar ─────────────────────────────────────────────────────────────────
export const videos = [
  { id: 1, title: 'Kazı Alanında Bir Gün', titleEn: 'A Day at the Excavation Site', category: 'documentary', duration: '18:34', year: 2023, thumbnail: 'https://picsum.photos/seed/vid1/640/360', youtubeId: 'dQw4w9WgXcQ', description: 'Sektör A kazı alanında tipik bir iş gününün belgesel kaydı.', descriptionEn: 'Documentary recording of a typical working day at the Sector A excavation site.' },
  { id: 2, title: 'Bronz Fibula Keşfi', titleEn: 'Discovery of the Bronze Fibula', category: 'field', duration: '4:12', year: 2022, thumbnail: 'https://picsum.photos/seed/vid2/640/360', youtubeId: 'dQw4w9WgXcQ', description: 'Sektör B\'de Demir Çağı broşuna ait buluntuların keşif anı.', descriptionEn: 'The moment of discovery of Iron Age brooch findings in Sector B.' },
  { id: 3, title: 'CBS ile Arkeoloji – Konferans Sunumu', titleEn: 'Archaeology with GIS – Conference Presentation', category: 'conference', duration: '42:05', year: 2023, thumbnail: 'https://picsum.photos/seed/vid3/640/360', youtubeId: 'dQw4w9WgXcQ', description: '2023 Ankara Konferansı\'nda Prof. Dr. Ayşe Kaya tarafından sunulan bildiri.', descriptionEn: 'Paper presented by Prof. Dr. Ayşe Kaya at 2023 Ankara Conference.' },
  { id: 4, title: 'Demir Çağı\'nı Anlamak', titleEn: 'Understanding the Iron Age', category: 'education', duration: '25:48', year: 2022, thumbnail: 'https://picsum.photos/seed/vid4/640/360', youtubeId: 'dQw4w9WgXcQ', description: 'Demir Çağı kültürü ve buluntularına giriş niteliğinde eğitim videosu.', descriptionEn: 'Educational video introducing Iron Age culture and findings.' },
  { id: 5, title: 'Hava Fotoğrafçılığı ile Arkeoloji', titleEn: 'Archaeology with Aerial Photography', category: 'documentary', duration: '12:20', year: 2023, thumbnail: 'https://picsum.photos/seed/vid5/640/360', youtubeId: 'dQw4w9WgXcQ', description: 'Drone fotoğrafçılığının arkeolojik dokümantasyondaki rolü.', descriptionEn: 'The role of drone photography in archaeological documentation.' },
  { id: 6, title: 'Nekropol Kazıları – 2022 Sezonu', titleEn: 'Necropolis Excavations – 2022 Season', category: 'field', duration: '9:55', year: 2022, thumbnail: 'https://picsum.photos/seed/vid6/640/360', youtubeId: 'dQw4w9WgXcQ', description: '2022 sezonu nekropol kazılarının saha kaydı.', descriptionEn: 'Field recording of 2022 season necropolis excavations.' },
  { id: 7, title: 'Obsidyen Analizi – Laboratuvar', titleEn: 'Obsidian Analysis – Laboratory', category: 'education', duration: '15:30', year: 2023, thumbnail: 'https://picsum.photos/seed/vid7/640/360', youtubeId: 'dQw4w9WgXcQ', description: 'XRF analizi ile obsidyen kaynak belirleme süreci.', descriptionEn: 'Obsidian source determination process using XRF analysis.' },
  { id: 8, title: 'Proje Tanıtım Filmi', titleEn: 'Project Introduction Film', category: 'documentary', duration: '6:44', year: 2021, thumbnail: 'https://picsum.photos/seed/vid8/640/360', youtubeId: 'dQw4w9WgXcQ', description: 'Araştırma projesini genel hatlarıyla tanıtan tanıtım filmi.', descriptionEn: 'Introduction film broadly presenting the research project.' },
]

// ─── Ekip ─────────────────────────────────────────────────────────────────────
export const teamMembers = [
  { id: 1,  name: 'Doç. Dr. S. Gökhan Tiryaki',  nameEn: 'Assoc. Prof. Dr. S. Gökhan Tiryaki',  role: 'Proje Sorumlusu',      roleEn: 'Project Director',          photo: 'https://picsum.photos/seed/tm1/200/200',  specialization: 'Protohistorya',                      specializationEn: 'Protohistory' },
  { id: 2,  name: 'Dr. Selda Baybo',              nameEn: 'Dr. Selda Baybo',                      role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm2/200/200',  specialization: 'Arkeoloji / Kültürel Miras',         specializationEn: 'Archaeology / Cultural Heritage' },
  { id: 3,  name: 'Doç. Dr. Hülya Kökmen-Seyirci',nameEn: 'Assoc. Prof. Dr. Hülya Kökmen-Seyirci',role: 'Bilim Heyeti Üyesi',  roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm3/200/200',  specialization: 'Arkeoloji',                          specializationEn: 'Archaeology' },
  { id: 4,  name: 'Doç. Dr. Mehmet Oktan',        nameEn: 'Assoc. Prof. Dr. Mehmet Oktan',        role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm4/200/200',  specialization: 'Epigrafya',                          specializationEn: 'Epigraphy' },
  { id: 5,  name: 'Doç. Dr. Burak Takmer',        nameEn: 'Assoc. Prof. Dr. Burak Takmer',        role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm5/200/200',  specialization: 'Eskiçağ Tarihi / Epigrafya',         specializationEn: 'Ancient History / Epigraphy' },
  { id: 6,  name: 'Dr. Cemre Derici',             nameEn: 'Dr. Cemre Derici',                     role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm6/200/200',  specialization: 'Prehistorya',                        specializationEn: 'Prehistory' },
  { id: 7,  name: 'Dr. Kerem Demir',              nameEn: 'Dr. Kerem Demir',                      role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm7/200/200',  specialization: 'Prehistorya',                        specializationEn: 'Prehistory' },
  { id: 8,  name: 'Dr. Gülnaz Acar',             nameEn: 'Dr. Gülnaz Acar',                      role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm8/200/200',  specialization: 'Arkeoloji',                          specializationEn: 'Archaeology' },
  { id: 9,  name: 'Dr. Mahmut Demir',             nameEn: 'Dr. Mahmut Demir',                     role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm9/200/200',  specialization: 'Tarih',                              specializationEn: 'History' },
  { id: 10, name: 'Dr. Osman Özarslan',           nameEn: 'Dr. Osman Özarslan',                   role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm10/200/200', specialization: 'Tarih / Sosyoloji',                  specializationEn: 'History / Sociology' },
  { id: 11, name: 'Uzm. Deniz Tanrıverdi',        nameEn: 'Spec. Deniz Tanrıverdi',               role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm11/200/200', specialization: 'Arkeoloji / Müzeoloji',              specializationEn: 'Archaeology / Museology' },
  { id: 12, name: 'Aysel Ovalıoğlu',              nameEn: 'Aysel Ovalıoğlu',                      role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm12/200/200', specialization: 'Arkeoloji',                          specializationEn: 'Archaeology' },
  { id: 13, name: 'Saadet Öztürk',                nameEn: 'Saadet Öztürk',                        role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm13/200/200', specialization: 'Arkeoloji',                          specializationEn: 'Archaeology' },
  { id: 14, name: 'Ecem Akkaya',                  nameEn: 'Ecem Akkaya',                          role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm14/200/200', specialization: 'Arkeoloji',                          specializationEn: 'Archaeology' },
  { id: 15, name: 'Recep Şahin',                  nameEn: 'Recep Şahin',                          role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm15/200/200', specialization: 'Arkeoloji',                          specializationEn: 'Archaeology' },
  { id: 16, name: 'Fevzi Metin',                  nameEn: 'Fevzi Metin',                          role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm16/200/200', specialization: 'Türkoloji',                          specializationEn: 'Turkology' },
  { id: 17, name: 'Uzm. İpek İpekçioğlu',         nameEn: 'Spec. İpek İpekçioğlu',                role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm17/200/200', specialization: 'Sanat Tarihi',                       specializationEn: 'Art History' },
  { id: 18, name: 'Azize Yener',                  nameEn: 'Azize Yener',                          role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm18/200/200', specialization: 'Arkeoloji',                          specializationEn: 'Archaeology' },
  { id: 19, name: 'Yadigar Doğan',                nameEn: 'Yadigar Doğan',                        role: 'Bilim Heyeti Üyesi',   roleEn: 'Scientific Board Member',   photo: 'https://picsum.photos/seed/tm19/200/200', specialization: 'Epigrafya',                          specializationEn: 'Epigraphy' },
]

export const recentFindings = findingPoints.slice(0, 6)

// ─── Mahalleler ──────────────────────────────────────────────────────────────
export interface MahalleSubItem {
  title: string
  titleEn: string
  description?: string
  descriptionEn?: string
  photoDir?: string   // public/mahalleler/ altındaki klasör yolu
}

export interface MahalleCategory {
  title: string
  titleEn: string
  icon: string
  items: MahalleSubItem[]
  photoDir?: string   // alt öğesi olmayan kategoriler için
}

export interface Mahalle {
  slug: string
  name: string
  description: string
  descriptionEn: string
  categories: MahalleCategory[]
}

export const MAHALLE_LIST = [
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

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/\s+/g, '-')
}

export const mahalleler: Mahalle[] = [
  {
    slug: 'bayindir',
    name: 'Bayındır',
    description: 'Elmalı ilçe merkezinin güneybatısında yer alan Bayındır Mahallesi, zengin arkeolojik ve kültürel mirası ile bölgenin en önemli yerleşim birimlerinden biridir. Antik dönemlerden bu yana kesintisiz iskân görmüş olan mahalle, çok katmanlı tarihsel dokusuyla dikkat çekmektedir.',
    descriptionEn: 'Bayındır Neighborhood, located southwest of Elmalı district center, is one of the most important settlements in the region with its rich archaeological and cultural heritage. The neighborhood, which has been continuously inhabited since ancient times, is notable for its multi-layered historical texture.',
    categories: [
      {
        title: 'Arkeoloji',
        titleEn: 'Archaeology',
        icon: '🏛',
        items: [
          { title: 'Antik Yollar', titleEn: 'Ancient Roads', photoDir: 'bayindir/arkeoloji/antik-yollar' },
          { title: 'Antik Yerleşimler', titleEn: 'Ancient Settlements', photoDir: 'bayindir/arkeoloji/antik-yerlesimler' },
          { title: 'Nekropoller', titleEn: 'Necropolises', photoDir: 'bayindir/arkeoloji/nekropoller' },
          { title: 'Kilise / Şapel', titleEn: 'Church / Chapel', photoDir: 'bayindir/arkeoloji/kilise-sapel' },
          { title: 'Yazıt', titleEn: 'Inscriptions', photoDir: 'bayindir/arkeoloji/yazit' },
          { title: 'Antik Tarım Terasları', titleEn: 'Ancient Agricultural Terraces', photoDir: 'bayindir/arkeoloji/antik-tarim-teraslari' },
          { title: 'İşlikler', titleEn: 'Workshops', photoDir: 'bayindir/arkeoloji/islikler' },
          { title: 'Önemli Buluntular', titleEn: 'Important Findings', photoDir: 'bayindir/arkeoloji/onemli-buluntular' },
        ],
      },
      {
        title: 'Halk Mimariliği',
        titleEn: 'Folk Architecture',
        icon: '🏘',
        items: [
          { title: 'Ahşap Tahıl Ambarları', titleEn: 'Wooden Granaries', photoDir: 'bayindir/halk-mimariligi/ahsap-tahil-ambarlari' },
          { title: 'Açık Hava İbadet Alanları', titleEn: 'Open Air Worship Areas', photoDir: 'bayindir/halk-mimariligi/acik-hava-ibadet-alanlari' },
        ],
      },
      {
        title: 'Defin Alanları',
        titleEn: 'Burial Areas',
        icon: '🪦',
        items: [
          { title: 'Köy Mezarlığı', titleEn: 'Village Cemetery', photoDir: 'bayindir/defin-alanlari/koy-mezarligi' },
          { title: 'Yaran Mezarlığı', titleEn: 'Yaran Cemetery', photoDir: 'bayindir/defin-alanlari/yaran-mezarligi' },
        ],
      },
      {
        title: 'Çeşmeler',
        titleEn: 'Fountains',
        icon: '⛲',
        items: [],
        photoDir: 'bayindir/cesmeler',
      },
      {
        title: 'Sözlü Kültür',
        titleEn: 'Oral Culture',
        icon: '🗣',
        items: [],
        photoDir: 'bayindir/sozlu-kultur',
      },
    ],
  },
]

/** Slug'a göre mahalle bul; veri yoksa varsayılan boş şablon döndür */
export function getMahalle(slug: string): Mahalle {
  const found = mahalleler.find(m => m.slug === slug)
  if (found) return found

  const name = MAHALLE_LIST.find(m => toSlug(m) === slug) ?? slug
  return {
    slug,
    name,
    description: `${name} Mahallesi, Elmalı ilçesine bağlı bir yerleşim birimidir.`,
    descriptionEn: `${name} is a neighborhood in the Elmalı district.`,
    categories: [
      {
        title: 'Arkeoloji', titleEn: 'Archaeology', icon: '🏛',
        items: [
          { title: 'Antik Yollar', titleEn: 'Ancient Roads', photoDir: `${slug}/arkeoloji/antik-yollar` },
          { title: 'Antik Yerleşimler', titleEn: 'Ancient Settlements', photoDir: `${slug}/arkeoloji/antik-yerlesimler` },
          { title: 'Nekropoller', titleEn: 'Necropolises', photoDir: `${slug}/arkeoloji/nekropoller` },
          { title: 'Kilise / Şapel', titleEn: 'Church / Chapel', photoDir: `${slug}/arkeoloji/kilise-sapel` },
          { title: 'Yazıt', titleEn: 'Inscriptions', photoDir: `${slug}/arkeoloji/yazit` },
          { title: 'Antik Tarım Terasları', titleEn: 'Ancient Agricultural Terraces', photoDir: `${slug}/arkeoloji/antik-tarim-teraslari` },
          { title: 'İşlikler', titleEn: 'Workshops', photoDir: `${slug}/arkeoloji/islikler` },
          { title: 'Önemli Buluntular', titleEn: 'Important Findings', photoDir: `${slug}/arkeoloji/onemli-buluntular` },
        ],
      },
      {
        title: 'Halk Mimariliği', titleEn: 'Folk Architecture', icon: '🏘',
        items: [
          { title: 'Ahşap Tahıl Ambarları', titleEn: 'Wooden Granaries', photoDir: `${slug}/halk-mimariligi/ahsap-tahil-ambarlari` },
          { title: 'Açık Hava İbadet Alanları', titleEn: 'Open Air Worship Areas', photoDir: `${slug}/halk-mimariligi/acik-hava-ibadet-alanlari` },
        ],
      },
      {
        title: 'Defin Alanları', titleEn: 'Burial Areas', icon: '🪦',
        items: [
          { title: 'Köy Mezarlığı', titleEn: 'Village Cemetery', photoDir: `${slug}/defin-alanlari/koy-mezarligi` },
          { title: 'Yaran Mezarlığı', titleEn: 'Yaran Cemetery', photoDir: `${slug}/defin-alanlari/yaran-mezarligi` },
        ],
      },
      { title: 'Çeşmeler', titleEn: 'Fountains', icon: '⛲', items: [], photoDir: `${slug}/cesmeler` },
      { title: 'Sözlü Kültür', titleEn: 'Oral Culture', icon: '🗣', items: [], photoDir: `${slug}/sozlu-kultur` },
    ],
  }
}

export { toSlug }
