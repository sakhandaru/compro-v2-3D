# MASTER DESIGN --- RIFQI SAKHO PERSONAL PORTFOLIO

> Dokumen ini adalah sumber kebenaran utama (single source of truth)
> untuk arah desain, UX, motion, interaction, dan storytelling
> portfolio.
>
> Gunakan dokumen ini sebagai **guardrail** setiap kali mengembangkan,
> mendesain, atau mengubah bagian website.
>
> **Tujuan utama: bukan membuat delapan section yang keren, tetapi
> membuat satu pengalaman yang utuh.**

------------------------------------------------------------------------

## 1. NORTH STAR

Website ini **bukan portfolio developer konvensional**.

Website harus terasa seperti:

> **satu perjalanan interaktif yang secara bertahap memperkenalkan
> orang, pekerjaan, perjalanan, cara berpikir, dan akhirnya membuka
> ruang untuk berkomunikasi.**

Pengguna tidak seharusnya merasa sedang berpindah dari:

`Hero → About → Projects → Contact`

melainkan mengalami satu rangkaian:

``` text
CHAOS
  ↓
ENTRY
  ↓
CALM
  ↓
DISCOVERY
  ↓
EXPLORATION
  ↓
REFLECTION
  ↓
PERSONALITY
  ↓
CONNECTION
  ↓
CLOSURE
```

Prinsip utama:

``` text
EXPERIENCE > SECTIONS
STORY > COMPONENTS
TRANSITIONS > HARD CUTS
INTERACTION > DECORATION
TYPOGRAPHY > UI CHROME
SPATIAL COMPOSITION > CARD GRIDS
```

Jika sebuah elemen terlihat menarik secara individual tetapi merusak
pengalaman keseluruhan, **jangan gunakan**.

------------------------------------------------------------------------

# 2. STRUKTUR NARATIF UTAMA

Urutan pengalaman:

``` text
01  ENTRANCE
        ↓
02  HERO
        ↓
03  COMPUTER PORTAL
        ↓
04  INTRODUCTION
        ↓
05  SELECTED WORK
        ↓
06  ALL WORK / ARCHIVE
        ↓
07  TIMELINE
        ↓
08  ABOUT
        ↓
09  CONTACT
```

Makna setiap fase:

  Fase              Pertanyaan yang dijawab
  ----------------- ------------------------------------------
  Entrance          Apa yang sedang terjadi?
  Hero              Apa pengalaman ini?
  Computer Portal   Apa yang harus saya masuki?
  Introduction      Siapa Rifqi?
  Selected Work     Apa yang telah ia bangun?
  Archive           Seberapa luas pekerjaannya?
  Timeline          Bagaimana ia sampai di sini?
  About             Siapa orang di balik pekerjaan tersebut?
  Contact           Bagaimana saya terhubung dengannya?

**Jangan menambahkan section baru hanya karena sebuah ide terlihat
menarik.**

------------------------------------------------------------------------

# 3. SCROLL ADALAH BAHASA UTAMA

Scroll adalah **timeline utama pengalaman**.

Secara konseptual:

``` text
scroll position → visual state
```

Scroll bukan hanya cara berpindah halaman.

Scroll harus dapat mengendalikan:

-   posisi
-   scale
-   opacity
-   reveal
-   camera movement
-   typography movement
-   expansion
-   compression
-   spatial transformation
-   progression antar-state

### Aturan utama

Jika user berhenti scrolling:

> animasi utama berhenti.

Jika user scroll forward:

> pengalaman bergerak forward.

Jika user scroll backward:

> pengalaman dapat reverse secara natural.

Jangan menggunakan autoplay untuk storytelling utama.

Time-based animation boleh digunakan hanya untuk elemen yang memang
bersifat ambient dan tidak mengontrol narasi.

------------------------------------------------------------------------

# 4. NARATIVE ARC & DRAMATIC CURVE

Intensitas visual **tidak boleh konstan**.

Gunakan kontras sebagai alat storytelling:

``` text
LOUD       → QUIET
DENSE      → SPACIOUS
FAST       → SLOW
CHAOTIC    → ORDERED
TECHNICAL  → HUMAN
DARK       → RESTRAINED
KINETIC    → STILLNESS
```

Kurva pengalaman:

``` text
INTENSITAS

  ▲
  │       HERO
  │        ╲
  │         ╲ COMPUTER
  │          ╲
  │           INTRO
  │              ╲
  │           SELECTED WORK
  │             ╱    ╲
  │            ╱      ARCHIVE
  │                    ╲
  │                    TIMELINE
  │                       ╲
  │                        ABOUT
  │                          ╲
  │                         CONTACT
  │
  └────────────────────────────────→ SCROLL
```

Hero adalah titik intensitas tertinggi.

Introduction menjadi cooldown.

Selected Work kembali menaikkan energi melalui interaction.

Archive menjadi lebih systematic.

Timeline menjadi cinematic dan reflective.

About menjadi paling human dan tenang.

Contact menjadi **final act**, bukan sekadar footer.

------------------------------------------------------------------------

# 5. TRANSITION ADALAH BAGIAN DARI DESAIN

Jangan berpikir:

``` text
Section A
↓
hard cut
↓
Section B
```

Utamakan:

``` text
Section A
↓
visual transformation
↓
spatial transition
↓
Section B
```

Elemen dari satu fase boleh:

-   berubah ukuran
-   berpindah posisi
-   menghilang
-   menjadi elemen lain
-   tertutup
-   membuka sesuatu
-   berubah konteks

User harus merasa bahwa:

> **state sebelumnya menyebabkan state berikutnya.**

Transisi tidak harus selalu spektakuler.

Breathing space juga merupakan transisi.

------------------------------------------------------------------------

# 6. VISUAL LANGUAGE

Arah estetika utama:

``` text
EXPERIMENTAL
MINIMAL
EDITORIAL
TECHNICAL
CINEMATIC
SOPHISTICATED
HUMAN
```

Rasa yang diinginkan adalah perpaduan:

-   experimental digital portfolio
-   editorial design
-   interactive art direction
-   modern software interface
-   Framer/Webflow-level motion design

Tetapi hasil akhir **tidak boleh terasa seperti template
Framer/Webflow**.

Referensi eksternal digunakan untuk mengambil **prinsip**, bukan
menyalin layout.

------------------------------------------------------------------------

# 7. TYPOGRAPHY ADALAH SISTEM VISUAL UTAMA

Typography bukan sekadar isi teks.

Gunakan typography untuk membangun:

-   hierarchy
-   scale
-   rhythm
-   movement
-   spatial depth
-   transitions
-   emphasis
-   pacing

Gunakan:

-   typography sangat besar untuk focal moments
-   typography editorial untuk storytelling
-   typography kecil untuk metadata
-   weight dan spacing untuk hierarchy

Jangan bergantung pada:

-   card
-   gradient
-   icon
-   decorative UI

untuk menciptakan visual interest.

Typography harus tetap terbaca meskipun bergerak.

------------------------------------------------------------------------

# 8. MOTION PRINCIPLES

Setiap motion harus memiliki alasan.

Sebelum menambahkan animasi, tanyakan:

1.  Mengapa elemen ini bergerak?
2.  Apa yang dikomunikasikan oleh gerakan tersebut?
3.  Apa yang sedang ditemukan user?
4.  State apa yang berubah?
5.  Mengapa gerakan ini diperlukan di tempat ini?

### Karakter motion

Motion sebaiknya:

-   smooth
-   physical
-   intentional
-   cinematic
-   spatial
-   scroll-responsive
-   reversible
-   restrained ketika konteks membutuhkan ketenangan

Gunakan acceleration/deceleration yang natural.

Hindari gerakan yang terasa mekanis dan linear jika tidak diperlukan.

### Hindari

-   excessive bouncing
-   random floating
-   unnecessary parallax
-   constant particles
-   excessive hover animation
-   animasi di setiap elemen
-   decorative motion tanpa fungsi
-   motion yang mengganggu readability

**Motion harus memperkuat content, bukan mengalahkannya.**

------------------------------------------------------------------------

# 9. CHAOS HARUS TERKONTROL

Website ini memang eksperimental, tetapi:

> **eksperimental ≠ berantakan.**

Chaos hanya digunakan ketika memang diperlukan oleh narasi.

Hero boleh chaotic.

Introduction harus tenang.

Timeline harus reflective.

About harus human.

Contact harus controlled.

Jika seluruh website chaotic, tidak ada lagi rasa dramatis karena tidak
ada kontras.

------------------------------------------------------------------------

# 10. SPATIAL PRINCIPLE

Jangan memperlakukan viewport sebagai kotak statis yang hanya berisi UI.

Anggap viewport sebagai **ruang fisik**.

Elemen dapat:

-   masuk
-   keluar
-   membesar
-   mengecil
-   bergeser
-   berada di belakang elemen lain
-   tertutup
-   muncul dari balik elemen lain
-   membuka ruang baru
-   berubah menjadi komposisi berikutnya

Gunakan hubungan spatial untuk menyampaikan cerita.

------------------------------------------------------------------------

# 11. USER AGENCY

User harus merasa **mereka mengendalikan pengalaman**.

Jangan mengambil kontrol dari user dengan:

-   animation sequence yang terlalu panjang
-   autoplay storytelling
-   forced transition
-   loading yang tidak diperlukan
-   scroll hijacking yang membuat user kehilangan orientasi

Jika scroll digunakan sebagai controller, perilakunya harus terasa
natural.

------------------------------------------------------------------------

# 12. PERFORMANCE

Ambisi visual tidak boleh mengorbankan usability.

Prioritaskan:

-   GPU-friendly transforms
-   opacity
-   translate
-   scale
-   efficient rendering
-   lazy loading
-   optimized assets
-   controlled WebGL
-   progressive enhancement

Gunakan efek mahal hanya jika memang memberikan kontribusi visual yang
signifikan.

Jika dua pendekatan menghasilkan hasil yang hampir sama:

> **pilih implementasi yang lebih sederhana dan maintainable.**

------------------------------------------------------------------------

# 13. RESPONSIVE PRINCIPLES

Website harus bekerja pada:

-   desktop
-   tablet
-   mobile

Jangan sekadar mengecilkan desktop layout.

Mobile boleh menyederhanakan interaction ketika diperlukan.

Yang harus dipertahankan:

-   narrative
-   hierarchy
-   mood
-   sense of progression
-   relationship antar-state

Yang **tidak wajib identik**:

-   ukuran
-   posisi
-   jumlah elemen
-   kompleksitas motion
-   mekanisme interaction

> **Konsistensi pengalaman lebih penting daripada identitas animasi yang
> identik di semua device.**

------------------------------------------------------------------------

# 14. INFORMATION REVEAL

Informasi tidak perlu diberikan sekaligus.

User harus menemukannya secara bertahap:

``` text
WHO
 ↓
WHAT
 ↓
HOW MUCH
 ↓
HOW
 ↓
WHO BEHIND IT
 ↓
CONNECT
```

Jangan mengulang informasi yang sudah memiliki tempat sendiri.

Contoh:

-   Timeline bukan tempat mengulang seluruh CV.
-   About bukan tempat mengulang project list.
-   Archive bukan tempat membuat semua project terasa seperti featured
    project.
-   Contact bukan tempat menambahkan informasi baru yang tidak
    diperlukan.

Setiap bagian harus memiliki fungsi naratif yang jelas.

------------------------------------------------------------------------

# 15. SECTION DIRECTION

## 15.1 Entrance

Fungsi:

> memberikan kesan bahwa sistem sedang dimulai.

Entrance singkat dan subtle.

Jangan menghabiskan waktu user hanya untuk menunggu intro animation.

------------------------------------------------------------------------

## 15.2 Hero

Hero adalah titik paling eksperimental dan intens.

Karakter:

-   kinetic typography
-   oversized pixel/display typography
-   banyak baris horizontal
-   arah gerakan bergantian
-   repeated text
-   chaotic tetapi terstruktur
-   light
-   technical
-   cinematic
-   editorial

Background hero **terang**, bukan gelap.

Typography awal dapat bergerak cepat kemudian melambat menjadi
continuous movement.

Hero tidak boleh terasa seperti hero developer biasa.

Rujukan override (2026-09-27): owner menetapkan hero terang.
Aturan lama `dark` dicoret. Konsekuensi dan konsekuensinya
dijelaskan di 15.3.

#### Override marquee (2026-09-27)

Owner menetapkan bahwa typography hero **tidak lagi
scroll-driven**. Ia berjalan sendiri sebagai marquee berulang.
Ini bertabrakan langsung dengan §3 `SCROLL ADALAH BAHASA
UTAMA` dan dengan `kinetic typography` di atas, jadi dicoret
dan diganti:

``` text
scroll  →  kamera saja (masuk ke layar, 15.3)
marquee →  jam sendiri, tidak terikat scroll
```

Alasannya: tipografi diperlakukan sebagai tekstur ambient,
bukan sebagai headline yang sedang dibacakan. Kalau ia
terikat scroll, yang terbaca bukan "komputer di tengah lautan
teks", tapi sebuah slider yang sedang di-scrub.

Konsekuensi yang harus diterima:

-   scroll tidak lagi menggerakkan apa pun yang bisa dibaca
-   `prefers-reduced-motion` mematikan marquee sepenuhnya,
    bukan memperlambatnya
-   section tetap 420vh karena runway itu sekarang milik
    kamera

Konsekuensi kedua: hero **tidak punya headline yang terlihat**.
Nama tidak lagi dicetak besar. Aturan `oversized typography`
dan `repeated text` tetap terpenuhi lewat baris marquee, tapi
nama hanya tersedia sebagai `h1` untuk screen reader, crawler,
dan preview link. Ini keputusan owner, bukan kelalaian.

Font hero juga ditetapkan owner: **Geist Pixel saja**, untuk
seluruh tipografi hero. Densitas dua tingkat yang ada di
referensi diambil dari axis `ELSH`, bukan dari weight, karena
family ini hanya menyediakan weight 400.

Drama pada background terang tidak boleh datang dari gradient
atau glow. Sumber drama adalah arah cahaya pada permukaan objek
itu sendiri:

``` text
satu arah cahaya yang tegas, dari depan-atas
↓
sisi jauh dari cahaya turun ke gelap, fill ambient dijaga rendah
↓
siluet tetap terbaca karena sisi gelap gading berbenturan dengan latar terang
```

Rujukan override (2026-09-27): owner menetapkan hero **tanpa
cast shadow**. Karena itu blok `cast shadow yang panjang dan
terlihat` yang lama dicoret, dan digantikan oleh directional
falloff di atas. Ground shadow, contact shadow, dan shadow map
tidak dipakai sama sekali.

Konsekuensi yang harus diterima:

-   drama tidak lagi datang dari bayangan di lantai
-   scene tidak butuh shadow map, `castShadow`, atau fake
    contact shadow. Menambahkannya hanya memperkenalkan
    anomali bayangan
-   bentuk objek harus tetap terbaca dari sisi gelapnya, bukan
    dari bayangannya

Bukan dari gradient, bukan dari glow.

------------------------------------------------------------------------

## 15.3 Computer Portal

3D computer adalah focal point.

Komputer relatif stabil, sementara typography bergerak memberi
jalan. Arahnya bukan "di belakang komputer" lagi, melainkan pita
atas dan bawah, karena tipografi kini menjadi DOM di atas canvas.
Lihat override occlusion di bawah bagian ini.

Layar komputer berwarna hitam.

Tubuh komputer berwarna gading atau ivory, mengikuti estetika
plastik terminal klasik.

``` text
background  #f7f6f2  (putih hangat, bukan #ffffff murni)
tubuh       #e3dcc8  gading
            #f0ead9  ivory, kalau butuh versi lebih bersih
keycap      #c4b99c
socket      #8a8069
knob        #dd6a2b  (aksen jingga modern, penanda interaksi)
layar       #05050a  (hampir hitam, bukan #000000 murni)
```

Rujukan override (2026-09-27): `layar #000000` dicoret, dipakai
`#05050a`. Perbedaan kecil, tapi mencegah layar terbaca sebagai
lubang hitam mati saat tone mapping diterapkan.

keycap, socket, dan knob dipisah dari body lewat
connected-component analysis, lalu diberi warna sendiri. Tanpa
pemisahan ini seluruh terminal jadi satu blok gading dan aksen
jingga hilang.

Karena latar terang, aturan yang berlaku di sini berbeda
dengan latar gelap. Yang wajib dipenuhi:

-   **sisi objek wajib jatuh ke gelap.** Fill ambient dijaga
    rendah supaya bentuk tetap terbaca
-   ~~**cast shadow wajib terlihat.** Ini yang menjangkar
    objek, bukan opsional~~ **DICORET 2026-09-27.** Owner
    memilih tampilan tanpa shadow. Penjarasan objek sekarang
    datang dari directional falloff pada permukaan, bukan dari
    bayangan. Lihat 15.2
-   tone mapping pakai `NeutralToneMapping`. `ACESFilmic`
    meremukkan gading menjadi olive kecoklatan
-   gading di atas `#ffffff` murni hampir tidak terbaca.
    Pakai putih hangat

Saat user scroll:

``` text
camera approaches computer
↓
computer scales up
↓
typography gives way
↓
screen dominates viewport
↓
black screen fills viewport
```

Jangan sekadar membuat komputer membesar seperti image biasa.

Rasanya harus seperti **kamera masuk ke dalam komputer**.

#### Typography occlusion:resolved (2026-09-27)

`typography becomes occluded` **terpenuhi secara harfiah.**

Owner memberi referensi dengan komputer di tengah dan baris teks
yang berjalan melewati belakangnya. Untuk menirukan itu:

``` text
layer bawah   marquee, full-bleed, position absolute
layer atas    canvas, alpha true, clear alpha 0
```

Canvas dibuat transparan dan tidak lagi memasang
`<color attach="background">`. Warna latar datang dari CSS
section. Akibatnya model benar-benar menutupi huruf yang lewat
di belakangnya.

Deviasi lama ("DOM di atas canvas, hanya pseudo-occlusion")
**dihapus**, bukan ditumpuk. Tidak ada lagi transform/opacity
per-frame pada tipografi, dan tidak ada lagi jalur tabrakan
antara pita teks dan badan komputer.

Computer menghadap **depan**, bukan tiga-quarter. Kamera berada
di sumbu normal layar dengan sedikit uplift, dan selalu membidik
pusat layar, bukan pusat bounding box model. Membidik pusat
bounding box memiringkan terminal ke atas karena dek keyboard
menarik pusat itu ke bawah.

Owner juga menetapkan `Bounds` dan `Center` dari drei tidak
dipakai. Keduanya menyentuh kamera atau mengukur sekali lalu
cache, dan keduanya bertabrakan dengan rig kamera. Penempatan
model dilakukan eksplisit di `hero-model.tsx`.

Semua animasi DOM yang tersisa adalah transform pada elemen
marquee, dan itu milik CSS, bukan scroll timeline.

#### Cursor follow (2026-09-27)

Owner meminta komputer **mengikuti cursor**, dan menetapkan
bahwa yang bergerak adalah **seluruh unit**, bukan hanya layar.

``` text
cursor kiri/kanan  →  yaw   ±3°
cursor atas/bawah  →  pitch ±2°
damping 4.5       →  ada massa, tidak menempel
```

Ini sengaja menyentuh dua aturan yang ada di dokumen ini, jadi
dicatat sebagai keputusan owner:

-   baris 352-353 melarang `unnecessary parallax`. Yang
    membebaskan motion ini adalah fungsinya: 15.3 menyebut
    layar sebagai portal, dan mesin yang memperhatikan reader
    adalah undangan untuk masuk. Tanpa itu, motion ini persis
    `unnecessary parallax`
-   baris 636 menyebut komputer `relatif stabil`. Yang
    Relative di situ adalah posisi di frame, bukan orientasi.
    Unit tidak pernah keluar dari tengah frame dan tidak pernah
    berputar lebih dari 3 derajat

Batas yang tidak boleh dilewati:

-   ~~monitor berputar seperti webcam~~. Head swivel di body
    yang diam terbaca sebagai gimmick. Body yang bergeser
    terbaca sebagai berat. Owner memilih yang kedua
-   **ikutnya harus mati sebelum kamera menutup.** Authority
    gerak dikalikan `(1 - eased)`, jadi di akhir scroll
    Follow sudah tepat 0 dan end state tetap persegi hitam
    yang lurus. Ini terukur: 0 piksel berubah pada scroll
    akhir
-   mati untuk `prefers-reduced-motion`
-   mati untuk `pointer: coarse`. Tidak ada cursor di touch,
    jadi tidak ada yang perlu dilayani

Efek samping yang justru bagus: `SCREEN_ROUGHNESS 0.11` dengan
`SCREEN_ENV_INTENSITY 1.9` berarti sedikit rotasi menghidupkan
refleksi di kaca. Itu yang menjual kacanya sebagai kaca.

------------------------------------------------------------------------

## 15.4 Scroll-Driven Loading

Black screen menjadi portal.

Loading progress dikendalikan oleh scroll.

``` text
scroll → progress
```

Jika user berhenti:

``` text
progress berhenti
```

Jika user melanjutkan:

``` text
progress berlanjut
```

100% menjadi trigger untuk membuka portfolio.

Loading bukan loading sungguhan; ia adalah **interaction device**.

------------------------------------------------------------------------

## 15.5 Introduction

Introduction adalah **cooldown setelah chaos**.

Karakter:

``` text
CALM
EDITORIAL
SPACIOUS
READABLE
CONFIDENT
```

Narasi secara umum:

``` text
HELLO.
↓
I'M RIFQI.
↓
I'M RIFQI SAKHO,
A SOFTWARE DEVELOPER
BASED IN INDONESIA.
↓
I BUILD DIGITAL EXPERIENCES
AND SOFTWARE SYSTEMS.
↓
LET ME SHOW YOU
WHAT I'VE BUILT.
↓
SELECTED WORK
```

Copy dapat disesuaikan selama fungsi naratifnya tetap sama.

Jangan membuat Introduction seperti CV atau About page generik.

------------------------------------------------------------------------

## 15.6 Selected Work

Selected Work berisi **sekitar 4 project flagship**, bukan seluruh
portfolio.

Awal:

``` text
| 01 | 02 | 03 | 04 |
```

Scroll vertikal mengontrol komposisi horizontal/expansive.

Progress:

``` text
| PROJECT 01 OPEN | 02 | 03 | 04 |
        ↓
| 01 | PROJECT 02 OPEN | 03 | 04 |
        ↓
| 01 | 02 | PROJECT 03 OPEN | 04 |
        ↓
| 01 | 02 | 03 | PROJECT 04 OPEN |
```

Section dapat menggunakan pinned/sticky state selama interaction.

Setelah project terakhir selesai:

> lepaskan pinned state dan kembali ke vertical scrolling normal.

Ini **bukan horizontal carousel**.

Rasa interaction:

``` text
scroll
→ composition transforms
→ project opens
→ scroll continues
→ next project opens
```

------------------------------------------------------------------------

## 15.7 All Work / Archive

Portfolio memiliki banyak project.

Jangan memaksa seluruh project mendapatkan interaction seberat Selected
Work.

Archive berfungsi menunjukkan **breadth**.

Arah visual:

-   systematic
-   dense
-   informational
-   directory-like
-   editorial

Boleh menggunakan struktur seperti:

``` text
WORK DIRECTORY

/2026
  /project-a
  /project-b
  /project-c

/2025
  /project-d
  /project-e
```

Atau daftar editorial dengan preview visual.

Archive harus terasa berbeda dari Selected Work:

``` text
SELECTED WORK = DEPTH
ARCHIVE       = BREADTH
```

------------------------------------------------------------------------

## 15.8 Timeline

Timeline menjawab:

> **Bagaimana saya sampai di sini?**

Bukan:

> Di mana saya pernah bekerja?

Gunakan prinsip **Framer Infinite Timeline** sebagai referensi
interaction dan spatial composition, bukan untuk disalin.

Timeline harus terasa seperti perjalanan.

Milestone yang jauh:

-   lebih kecil
-   lebih subtle
-   opacity lebih rendah

Milestone aktif:

-   lebih besar
-   lebih readable
-   menjadi focal point

Scroll mengontrol perjalanan timeline.

Timeline sebaiknya berisi sekitar **6--8 milestone penting**, bukan
dipaksa menjadi CV lengkap.

Mood:

``` text
SPACIOUS
CINEMATIC
REFLECTIVE
HUMAN
EDITORIAL
```

Setelah milestone terakhir:

``` text
STILL BUILDING.
```

atau statement sejenis menjadi bridge menuju About.

------------------------------------------------------------------------

## 15.9 About

About **bukan CV kedua**.

About menjawab:

> **Siapa orang di balik semua pekerjaan ini?**

About harus fokus pada:

-   cara berpikir
-   hal yang dianggap penting
-   philosophy
-   sisi manusia
-   kondisi/aktivitas saat ini

Arah naratif:

``` text
ABOUT
↓
I BUILD THINGS.
↓
PERSONAL STATEMENT
↓
HOW I THINK
↓
OUTSIDE THE SCREEN
↓
CURRENTLY
↓
STILL BUILDING.
↓
CONTACT
```

About adalah salah satu bagian paling tenang.

Gunakan:

-   whitespace
-   editorial typography
-   asymmetric composition
-   subtle grid
-   thin dividers
-   restrained imagery

Hindari:

-   profile card generik
-   avatar circle sebagai focal point
-   skill badges
-   percentage charts
-   excessive 3D
-   unnecessary icons

------------------------------------------------------------------------

## 15.10 Contact

Contact adalah **FINAL ACT**.

Bukan generic contact form.

Arah:

``` text
ABOUT
↓
STILL BUILDING.
↓
THERE'S MORE TO BUILD.
↓
LET'S TALK.
↓
CONTACT
```

Typography besar menjadi focal point:

``` text
LET'S
TALK.
```

Contact information tetap sederhana.

Primary CTA:

> email / start a conversation

Form, jika diperlukan, adalah secondary interaction.

### Callback ke Hero

Hero:

``` text
oversized typography
repeated text
horizontal movement
high density
```

Contact:

``` text
controlled typography
repeated text
slow movement
low density
```

Contact menjadi versi yang lebih matang dan tenang dari bahasa visual
Hero.

Dengan demikian:

``` text
AWAL
KINETIC TYPOGRAPHY
↓
COMPUTER
↓
PORTFOLIO

AKHIR
PORTFOLIO
↓
KINETIC TYPOGRAPHY
↓
LET'S TALK.
```

Website terasa **closing the loop**.

Tidak ada section setelah Contact.

------------------------------------------------------------------------

# 16. REFERENCE PHILOSOPHY

Referensi Framer/Webflow boleh digunakan untuk:

-   scroll choreography
-   spatial transition
-   editorial composition
-   kinetic typography
-   project presentation
-   timeline interaction
-   contact experience

Referensi **bukan template**.

Jangan:

-   menyalin layout
-   menyalin visual identity
-   membuat website terlihat seperti clone
-   menambahkan feature hanya karena reference memilikinya

Ambil:

> **prinsip → adaptasi → buat menjadi identitas sendiri.**

------------------------------------------------------------------------

# 17. ANTI-PATTERN

Jangan default ke pola berikut:

-   hero "Hi, I'm a developer"
-   gradient blob
-   purple AI gradient
-   neon cyberpunk
-   generic 3D floating objects
-   generic project card grid
-   skill percentage
-   skill badge cloud
-   glassmorphism berlebihan
-   dashboard UI generik
-   "AVAILABLE FOR WORK" badge besar
-   testimonial carousel
-   statistik yang tidak diperlukan
-   social icon berlebihan
-   generic contact form
-   footer yang terlalu kompleks
-   particles hanya sebagai dekorasi
-   parallax hanya karena bisa

Jika sebuah solusi terlihat seperti sesuatu yang dapat ditemukan di
ribuan portfolio developer lain:

> **pertanyakan kembali apakah solusi tersebut benar-benar dibutuhkan.**

------------------------------------------------------------------------

# 18. ATURAN KONTINUITAS

Setiap keputusan baru wajib menjawab:

> **"Bagaimana ini terhubung dengan keadaan sebelumnya dan mempersiapkan
> keadaan berikutnya?"**

Gunakan hubungan:

``` text
previous state
      ↓
transformation
      ↓
new state
      ↓
next transformation
```

Bukan:

``` text
section
↓
section
↓
section
```

------------------------------------------------------------------------

# 19. ATURAN KESERASIAN

Jangan membuat setiap bagian menjadi "puncak".

Hero boleh menjadi paling loud.

Introduction boleh hampir diam.

Selected Work boleh kembali aktif.

Archive boleh padat.

Timeline boleh lambat.

About boleh sangat tenang.

Contact boleh kembali membesar.

**Dramaturgi berasal dari perubahan.**

------------------------------------------------------------------------

# 20. PRIORITAS SAAT ADA KONFLIK

Jika ada dua keputusan yang bertentangan, gunakan urutan prioritas:

1.  **Narasi**
2.  **Pengalaman pengguna**
3.  **Kejelasan konten**
4.  **Kontinuitas antar-state**
5.  **Visual hierarchy**
6.  **Interaction**
7.  **Aesthetic novelty**
8.  **Technical complexity**

Jangan mengorbankan narrative hanya untuk mendapatkan efek yang lebih
keren.

------------------------------------------------------------------------

# 21. QUALITY GATE

Sebelum menerima desain atau perubahan baru, evaluasi:

### Narrative

-   Apakah ini memperkuat cerita?
-   Apakah fungsinya jelas?
-   Apakah bagian ini mempersiapkan bagian berikutnya?

### Interaction

-   Apakah scroll memiliki makna?
-   Apakah motion memiliki alasan?
-   Apakah user tetap merasa memegang kendali?
-   Apakah interaction dapat reverse dengan natural?

### Visual

-   Apakah visual language tetap konsisten?
-   Apakah typography tetap menjadi sistem utama?
-   Apakah ada cukup whitespace?
-   Apakah contrast digunakan dengan sengaja?

### Identity

-   Apakah ini terasa seperti portfolio Rifqi?
-   Apakah ini terlalu mirip template?
-   Apakah elemen ini bisa ditemukan di ribuan portfolio developer lain?

### Technical

-   Apakah performant?
-   Apakah maintainable?
-   Apakah responsive?
-   Apakah efek ini benar-benar layak terhadap kompleksitasnya?

Jika jawabannya tidak, **sederhanakan atau hapus**.

------------------------------------------------------------------------

# 22. RUMUS PALING SINGKAT

Jika agent mulai melenceng, kembali ke rumus ini:

``` text
ONE EXPERIENCE > EIGHT SECTIONS

SCROLL = TIMELINE

CHAOS → CALM → DISCOVERY → EXPLORATION
→ REFLECTION → PERSONALITY → CONNECTION

MOTION MUST HAVE PURPOSE.

STILLNESS IS ALSO PART OF THE MOTION.

TYPOGRAPHY + SPATIAL COMPOSITION
ARE THE PRIMARY VISUAL TOOLS.

TRANSITIONS > HARD CUTS.

USER AGENCY > AUTOPLAY.

NARRATIVE > NOVELTY.

IDENTITY > TEMPLATE.

SIMPLE, INTENTIONAL CHANGE > COMPLEX EFFECT.

THE GOAL IS NOT TO CREATE
EIGHT IMPRESSIVE SECTIONS.

THE GOAL IS TO CREATE
ONE MEMORABLE JOURNEY.
```

------------------------------------------------------------------------

# 23. DEFINISI SUKSES

Portfolio ini berhasil jika user selesai scrolling dan merasa:

> **"Aku tidak hanya melihat portfolio. Aku mengalami perjalanan yang
> perlahan memperkenalkan siapa Rifqi, apa yang dia bangun, bagaimana
> dia sampai di sana, bagaimana dia berpikir, dan akhirnya bagaimana aku
> bisa menghubunginya."**

Semua keputusan desain harus mengarah ke perasaan tersebut.
