# MASTER DESIGN --- SAKHANDARU PERSONAL PORTFOLIO

> Design Read: portfolio personal untuk designer dan full-stack
> developer, bahasa visual editorial-teknis (terminal, pixel type,
> warm paper). **Dial: ENERGY 3 / RHYTHM 2 / MOTION 2.**
>
> ENERGY 3 karena hero dan computer portal harus tetap eksperimental
> seperti §1 dan §4 minta. RHYTHM 2, bukan 3, karena §9
> mensyaratkan chaos terkontrol dan hubungan antar section harus
> konsisten, bukan selalu berubah. MOTION 2 karena scroll adalah
> bahasa utama §3, tapi §11 melarang motion yang merampas kontrol;
> zona scroll yang dicengkeram harus sedikit dan terlihat disengaja.

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
01  HERO
        ↓
02  COMPUTER PORTAL
        ↓
03  HERO KEDUA
        ↓
04  SELECTED WORK
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
  Hero              Apa pengalaman ini?
  Computer Portal   Apa yang harus saya masuki?
  Hero Kedua        Siapa sakhandaru?
  Selected Work     Apa yang telah ia bangun?
  Archive           Seberapa luas pekerjaannya?  (15.7, dilewati)
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

#### Implementasi (2026-09-27)

Satu runway 600vh, dua fase, satu timeline:

``` text
0.00 → 0.70   kamera masuk ke layar
0.70 → 0.78   loader muncul
0.78 → 1.00   fill, 150vh scroll
```

Loader **digambar di atas canvas**, bukan di section terpisah. Ini
pilihan yang menentukan apakah 15.4 terbaca atau tidak: black
screen harus jadi permukaan, dan satu-satunya permukaan itu
layar 3D yang baru saja kita masuki. Kalau loader dibuat
section sendiri, ia akan mendarat di background hangat halaman
dan kehilangan seluruh maknanya.

Bentuknya bukan web progress bar. Layar memanas seperti CRT:
raster mengisi dari atas, scanline ride di ujungnya, dan
counter `000` ke `100`. Hijau tidak dipakai karena itu hue
yang tidak ada di halaman ini.

#### Latch (2026-09-27)

Progress bersifat **latch**: sekali 100%, nilainya tetap.

Alasannya bukan soal selera. Kalau fill-nya scroll
reversible penuh, begitu reader scroll naik lagi angkanya
mengosong dan portal terlihat menutup slam di atas pekerjaan
yang sudah pernah dilihat. Itu terbaca sebagai rusak, bukan
sebagai interaktif.

Yang di-latch adalah **nilainya**, bukan opacity loader-nya.
Jadi scroll balik tetap menarik kamera keluar, dan mesinnya
terlihat sudah menyala.

#### Runway: svh, bukan vh (2026-09-27)

Runway ditulis `600svh`, sticky ditulis `100dvh`. Keduanya
sengaja berbeda satuan.

Runway `vh` sebanding dengan tinggi viewport, jadi waktu URL bar
mobile menyusut, runway ikut kehilangan satu viewport penuh.
Scrolly yang sama lalu jatuh jauh lebih jauh di timeline.
Terukur: fill portal melompat dari `093` ke `100` pada scrollY
yang sama saat viewport berubah 844 ke 700, dan di HP asli itu
terjadi tiap kali URL bar bergeser. `svh` tidak bergerak, jadi
petanya stabil.

`dvh` pada sticky adalah kebutuhan yang berlawanan: ia harus
selalu sama dengan area yang terlihat, kalau tidak akan ada
potongan section berikutnya yang mengintip saat URL bar hilang.

Belum terverifikasi di lingkungan build: headless Chrome tidak
punya URL bar, jadi `vh`, `svh`, dan `dvh` identik di sana.
Perlu dicek sekali di perangkat asli.

#### HERO kedua

Section sendiri, dan 15.5 Introduction menyusul setelahnya.
Urutan shock → tenang → narasi.

HERO kedua **selalu ada di document flow**, tidak pernah
dirender kondisional. Menyembunyikannya sampai fill selesai
akan mengubah tinggi dokumen di saat reader sudah sampai di
tengah, dan seluruh halaman akan tersedot dari bawah kakinya.
Mencapainya sudah mensyaratkan menggulir melewati seluruh
fill, jadi tidak ada cara membukanya tanpa selesai.

`prefers-reduced-motion` **melewati portal sepenuhnya** dan
langsung ke HERO kedua. Fill tanpa scroll tidak punya arti, dan
gerakannya besar.

#### Nama (perlu diputuskan owner)

Nama sudah diputuskan owner (2026-09-27): **sakhandaru**. Semua
rujukan `Rifqi` / `Rifqi Sakho` di dokumen ini sudah diselaraskan
ke `sakhandaru`, dan copy 15.5 di atas mengikuti keputusan yang
sama. `sakhandaru` diperlakukan sebagai nama yang dipakai di
public, bukan handle.

------------------------------------------------------------------------

## 15.5 Introduction

**Owner memutuskan 15.5 tidak dibangun (2026-09-27).** Section
ini dilewati, dan setelah Computer Portal + HERO kedua
langsung masuk ke Selected Work.

Alasannya bukan sekadar hemat section. HERO kedua sudah
memikul beat tenang itu secara tonal, jadi 15.5 akan jadi
cooldown kedua, dan §4 hanya menyediakan satu titik turun di
sana. §1 sendiri memperingatkan "tanpa kontras tidak ada rasa
dramatis".

Konsekuensi yang harus diterima:

-   Fermata antara chaos dan Selected Work hilang
-   kata "sakhandaru" dan "based in indonesia" tidak lagi
    ditulis besar di mana pun; identitas hanya hidup di hero
-   15.10 "Callback ke Hero" kehilangan register cadangan:
    HERO kedua sudah memakai bahasa tenang, jadi Contact
    tidak bisa lagi menjadi versi matang dari bahasa Hero
-   halaman praktis tanpa prosa panjang sama sekali

Naskah di bawah ini dipertahankan sebagai referensi kalau
owner berubah pikiran.

---

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
I'M SAKHANDARU.
↓
I'M SAKHANDARU,
A UI/UX DESIGNER AND
FULL-STACK DEVELOPER
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

#### Bentuk final: accordion (owner, 2026-09-27)

Owner memutuskan 15.6 dibangun sebagai **accordion**, bukan
section pinned yang dikendalikan scroll.

Diagram progress di bawah **memang sudah state machine sebuah
accordion**: satu project OPEN, sisanya tertutup, berjalan 01
sampai 04. Yang berubah hanya sumbunya, dari baris horizontal
ke tumpukan vertikal. Jadi ini bukan penyimpangan dari dokumen
melainkan pembacaan yang lebih dekat ke maksudnya.

Alasan mengubahnya, dan semuanya karena versi pinned mengambil
terlalu banyak scroll milik pembaca:

-   versi pinned punya 716svh scroll yang dicengkeram dan tidak
    bisa dilewati untuk sampai ke 15.7
-   93% halaman jadi zona sticky. Scroll tidak pernah dikembalikan
    ke pembaca
-   untuk melihat project 08, pembaca harus lewat 01 sampai 07
    satu per satu
-   jumlah bug di section itu sendiri (scaling salah, timeline
    panjang 1.33, listener baca nilai basi, `inset` ditolak diam
    diam, double exposure) adalah bukti complexity-nya tidak
    sebanding dengan isi sebuah daftar project

Yang didapat:

-   tinggi section mengikuti isi, 1.64 viewport tertutup
-   **delapan judul terlihat sekaligus.** Reader tahu seluruh isi
    sebelum memilih, dan bisa langsung lompat ke project 08
-   tanpa sticky, tanpa ScrollTrigger, tanpa runway
-   keyboard dan screen reader jadi trivial

Catatan jujur: yang hilang adalah "horizontal/expansive
composition" dan bagian sticky. Keduanya tidak wajib, karena
kalimatnya "dapat", bukan "harus". Yang hilang juga dramanya.
15.6 tidak lagi mencoba menjadi hero kedua, dan itu memang
bagus, karena hero sudah memegang satu zona scroll yang kuat.

#### Deviasi dari teks di bawah (2026-09-27)

-   "sekitar 4" menjadi 8 project pilihan. Sisanya ke 15.7
-   `| 01 | 02 | 03 | 04 |` menjadi tumpukan vertikal
-   scroll **tidak lagi** membuka project; klik atau Enter yang
    membuka. Scroll hanya menggerakkan halaman
-   satu project bisa punya banyak mockup (`screens`), dan hanya
    yang pertama tampil di 15.6
-   halaman project khusus ada dalam rencana tapi belum ada di
    §2. Sementara itu 15.6 sengaja tidak membuat link ke
    kemana-mana

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

**Owner memutuskan 15.7 tidak dibangun (2026-09-27).**

Alasannya menyatu: tidak ada halaman project khusus, dan accordion
di 15.6 sudah cukup. 15.7 tugasnya "menunjukkan breadth" dengan
memberi jalan ke seluruh project. Tanpa halaman detail, tiap baris
tidak punya tujuan, jadi Archive hanya jadi daftar yang lebih
panjang dari baris yang sudah ada di 15.6.

Catatan: ini bukan berarti portfolio-nya sedikit. Delapan project
sudah ditampilkan seluruhnya di 15.6.

Kalau nanti halaman project dibangun, 15.7 kembali masuk akal dan
`slug` di `projects.ts` sudah tersedia untuk itu.

---

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

### Implementasi

Reference yang dipakai pemilik adalah timeline Michał Gren: blok teks di
kiri atas, kartu melayang di tengah, ruler full-bleed, readout di bawah kiri.
Komposisi itu diikuti, skin hitamnya tidak: section tetap cream, dan kartu
tetap teks karena belum ada gambar.

Desktop `>= 1024px` dipin. Scroll vertikal tidak ditelan, tapi membaca scroll
halaman sendiri lalu menggeser track, jadi satu kali flick ke bawah tetap
majukan perjalanan. Di bawah breakpoint dan untuk reduced motion, isi yang
sama dirender sebagai daftar vertikal tanpa pin sama sekali.

**Jarak sama semua, bukan skala waktu.** Versi pertama menaruh tiap entry di
tahun desimalnya, jadi jaraknya tidak merata: 2019 ke 2022 itu tiga tahun,
lalu empat entry terakhir terjepit dalam 1,6 tahun. Pemilik melihatnya dan
bertanya apa gunanya tahun-tahun itu. Fair. Jarak yang tidak rata itu tidak
menyampaikan apa pun yang bisa dipakai pembaca, hanya membuat section terlihat
rusak, dan ruler pun butuh label di setiap tahun untuk membenarkan dirinya.

Jadi jaraknya dibuat sama rata. Ruler jadi Texture, bukan kalender, dan
tahun pindah ke kartu masing-masing, di situ memang tempatnya.

| Keputusan | Nilai | Alasan |
| --- | --- | --- |
| `TRACKS` | `4` | jarak 0,375 viewport antar kartu, comparable dengan reference |
| `STEP` | `(1 - 2 * HEAD) / 8` | jarak sama, ujung tetap bisa sampai ke tengah |
| Sumbu baca | tepi kiri kolom teks | pemilik: yang membesar harus yang **kiri**, sejajar dengan yang di bawahnya |
| `FALLOFF` | `0.48` | kartu berjarak 0,375, jadi di bawah itu tetangga langsung hilang |
| `DIM` / `SMALL` | `0.18` / `0.87` | kartu yang tidak tersorot: makin kecil dan makin transparan |
| `GROW` | `1.07` | kartu yang tersorot membesar, jadi cuma satu fokus di layar |
| `RUNWAY` | `400svh` | rasio gerak per scroll 1,2 |
| `TICKS` | `240` varied `10-34px` | kepadatan dan texture ruler reference |

### Sumbu baca di kiri

Awalnya setiap kartu dipusatkan di layar dan aktifnya yang di tengah. Pemilik
bilang lain: yang membesar harus yang **kiri**, supaya sejajar dengan yang ada
di bawahnya. Jadi kartu tidak lagi dipusatkan pada posisinya, tapi digantung
dari tepi kirinya, dan sumbu bacanya pindah ke tepi kiri kolom teks, bukan
ke tengah viewport.

Kartu, readout, dan heading sekarang berbagi satu garis vertikal. Terukur
selaras **0px** di 1920, 1440, 1280, 1100, dan 1024, dan semuanya ikut turun
ke gutter 32px begitu kolom tidak lagi muat.

Aktifnya entry dihitung dari jarak tepi kiri kartu ke sumbu itu, memakai
geometri yang sama dengan yang menggeser track, jadi readout tidak pernah
melompat di depan kartu yang ada di bawahnya.

Jitter tick pakai hash sinus tetap, bukan `Math.random`, alasannya sama dengan
marquee hero: ruler harus di tempat yang sama tiap load, kalau tidak ia
berkedip tiap refresh.

Tiga bug yang ketahuan saat dibangun:

1. Readout melompat 2 entry di depan kartu yang ada di bawah pembaca,
   karena `active` dihitung dari `position = t * last` padahal jarak kartu
   tidak seragam.
2. `Math.min(position, 1)` menumpuk entry 06, 07, dan 08 persis di piksel
   yang sama: tiga kartu bertumpuk, hanya yang pertama terjangkau.
3. Bridge `STILL BUILDING.` menutupi 40% bawah viewport yang dipin, jadi
   milestone terakhir kehilangan kartu, ruler, dan readout-nya. Dipindah
   keluar dari section, jadi muncul setelah pin selesai.

Bug 1 dan 2 hilang bersama skala waktunya. Bug 3 tidak, dan tetap dicatat
di sini karena bridge masih bagian dari 15.8.

### Focal point

`GROW` punya konstanta sendiri dan tidak diturunkan dari `SMALL`. Versi
pertama menulis interpolasinya `SMALL + weight * (1 - SMALL)`, yang benar
untuk opacity karena kartu aktif harus mendarat persis di 1, tapi salah
untuk scale: aktifnya mentok di 1 dan tidak pernah membesar sama sekali.
`SMALL + weight * (GROW - SMALL)` yang benar. Skala di-anchor ke tepi bawah
supaya kartu tumbuh keluar dari ruler, bukan melayang lepas darinya.

### Keputusan pemilik

| Elemen | Keputusan | Aturan yang bersinggungan |
| --- | --- | --- |
| Tahun raksasa di kanan bawah | **Dihapus** | 1,17:1, R-25 minta 3:1 untuk teks sebesar itu. Tahun sudah ada di caption, jadi tidak ada yang hilang. Diganti counter `04 / 09` yang sesuai motif CRT |
| Tick ruler | **Tetap tipis** (1,37:1) | R-25. Tick adalah tekstur, bukan informasi: urutan dan tanggal dibawa kartu |
| Label tahun di ruler | **Dihapus** | Pemilik: "tahunnya ada apa-apanya, ga usah ditulis". Konsekuensi: ruler bukan lagi skala kalender |
| Jarak antar item | **Sama rata** | Pemilik: "biar jaraknya antar item sama semua". Konsekuensi: `at` tidak lagi dipakai untuk posisi |
| `2025 — 2026` di copy pemilik | **Dipertahankan** | R-02 hanya mengikat teks yang ditulis agent, bukan copy pemilik. Em dash di header yang ditulis agent sudah diganti `2019 to 2026` |
| Section tetap cream | **Ya** | Reference hitam, identitas situs cream |

Jumlah milestone 9, di luar "sekitar 6--8" di atas. Sembilan ini semuanya
turning point nyata, dan memotong salah satunya keputusan yang salah, jadi
selisihnya dicatat, bukan dirapikan diam-diam.

Belum ada baris metrik pada kartu. Reference punya
(`−52% SETUP TIME · +21% TRIAL → PAID`), dan R-17 melarang angka tanpa
sumber, jadi menunggu angka asli dari pemilik.

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

### Implementasi

Rail tipis di kiri, kolom lebar di sebelahnya, satu label mono kecil di rail
dan kalimat sebenarnya di kolom. Feed divider tipis antar blok. Itu composing
editorial asimetris yang diminta, dan rail-nya adalah sumbu kiri yang sama
yang dibaca Timeline, jadi section ini kelanjutan tenang dari garis yang sama,
bukan ide baru.

`subtle grid` sengaja tidak dipakai. Struktur sudah datang dari rail dan
divider, dan Menambah pola grid di atas itu jadi dekorasi, yang dilarang R-07
tanpa alasan.

Tidak ada satu pun animasi di section ini. Hero, portal, dan Timeline
bergerak; section yang dimaksud jadi bagian paling tenang di halaman tidak
perlu bersaing memperebutkan perhatian. MOTION di halaman ini 2, dan blok
editorial yang diam adalah jeda ritme yang sah, bukan animasi yang hilang.

### Isi

Pemilik menulis sendiri, dan itu pilihan yang benar. Isinya cuma dua
kalimat, dan pendek itu disengaja:

> I'm a Software Engineer who enjoys turning complex ideas and business needs
> into simple, reliable software.
>
> My work spans web applications, ERP platforms, and business systems, with a
> focus on building solutions that are practical, maintainable, and built to
> last.

Kata-kata itu dipakai apa adanya. Kalimat pertama jadi statement, kalimat
kedua jadi paragraf, keduanya tanpa rail karena tidak ada label kategori
untuknya, jadi keduanya jatuh satu kolom penuh.

Tidak ada narasi `HOW I THINK`, `OUTSIDE THE SCREEN`, atau `CURRENTLY` yang
disebutkan di atas. Semuanya ditanyakan, dan jawabannya "itu aja". Slot-nya
masih ada di `components/about-content.ts` kalau suatu saat mau diisi, tapi
section ini sekarang benar-benar hanya mengulang dirinya sendiri dalam dua
kalimat, dan itu hak pemilik.

### Skills

Pemilik juga minta skill-nya ditampilkan, dan minta daftarnya ditulis
sendiri. Bentuknya dipilih agar sesuai konsep section, bukan default:

-   satu daftar datar, tanpa pengelompokan sama sekali
-   nama skill jadi deretan biasa yang membungkus, dipisah middot
-   tanpa pill, tanpa border per item, tanpa bar, tanpa persentase

Awalnya skill dikelompokkan ke dalam kategori dengan label di rail kiri.
Pemilik bilang "tidak usah kategori lain", jadi pengelompokannya dihapus
dan skills jadi satu array datar. Efek sampingnya bagus: tidak ada lagi
kategori yang bisa menggantungkan satu ikon, jadi pertanyaan ikon menyempit
dari dua bentuk jadi satu, yaitu ikon per nama skill.

Yang menentukan: `JavaScript 85%` tidak akan naik ke halaman ini. 15.9
menaruh "skill badges" dan "percentage charts" di daftar avoid, R-09 melarang
kapsul, dan R-17 melarang angka tanpa sumber, jadi tidak ada versi yang
mengracuni ketiga aturan itu sekaligus. Yang tersisa adalah versi jujurnya:
nama-namanya saja, tanpa klaim apa pun tentang seberapa jago kamu di dalamnya.

Placeholder-nya tinggal diisi di `components/about-content.ts`. Key list pakai
index, bukan nama skill, supaya nama yang sama tetap aman kalau suatu saat
diulang.

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

### Implementasi

Contact dan footer jadi satu section, sesuai "tidak ada section setelah
Contact". Footer-nya strips tipis di dalam section yang sama, bukan elemen
yang menggantung setelahnya.

**Callback ke Hero, lewat skala bukan mekanik.** Paragraf di atas minta dua
hal yang kelihatan bertabrakan: callback ke Hero dengan repeated text dan
horizontal movement, sekaligus controlled typography dengan slow movement dan
low density. Keduanya bisa dipenuhi bersamaan, asal yang berubah adalah
skala, bukan mekaniknya.

| | Hero | Contact |
| --- | --- | --- |
| baris | 5 | 1 |
| kecepatan | 370-388 px/s | 22 px/s, 6% dari Hero |
| kontras | penuh | 1,37:1, `aria-hidden` |
| interaksi | tidak ada | `mailto:` asli di bawahnya |

Jadi callback-nya satu baris alamat email yang meluncur sangat lambat, dengan
link `mailto:` asli yang bisa diklik dan bisa difokus di bawahnya. Gerak dan
pengulangannya bahasa Hero; kecepatan, kepadatan, dan kontrasnya bahasa
Contact. Marquee 5 baris yang dikloning akan memenuhi callback dan melanggar
paragraf tepat di sebelahnya, dan akan jadi act berat keempat di halaman yang
sudah pin dua kali.

Baris yang bergerak itu dekorasi dan tautan yang bisa diklik itu nyata, susunan
yang sama dengan tick ruler dan tahun raksasa yang sudah diputuskan pemilik
sebelumnya: sesuatu yang diam bergerak, sesuatu yang solid berfungsi.

Kelas marquee milik Hero dipakai ulang, bukan set keyframes kedua, jadi aturan
reduced motion yang sudah ada ikut menghentikan WITHOUT saya menulis ulang.

**Tidak ada form.** 15.10 mengizinkan form sebagai interaksi sekunder, tapi
form butuh tujuan POST, dan form yang tidak bisa dikirim adalah kontrol mati.
`mailto:` tidak bisa gagal, jadi tidak butuh empty, loading, dan error state
yang R-27 minta dari apa pun yang bisa gagal.

### Data dari `compro-data`

Detail kontak diambil dari `compro-data/content/personal.json`, dengan tiga
pengecualian yang disengaja:

| Dari JSON | Yang dipakai | Kenapa tidak apa adanya |
| --- | --- | --- |
| `name.display: "Rifqis Sakha"` | tetap `sakhandaru` | Pemilik sudah menetapkan nickname untuk seluruh situs, dan `DESIGN..md` diselaraskan. Mengikuti JSON di sini akan membatalkan itu diam-diam |
| `socials.linkedin` | tidak dilink | URL-nya `https://linkedin.com/in/Rifqis Sakha`, ada spasi di path, jadi tidak resolve. Menebak slug aslinya berarti mengarang, dan link ke 404 lebih buruk daripada tidak ada link. Diperbaiki di JSON, dia muncul sendiri tanpa ubah kode |
| `socials.whatsapp` / `instagram` / `gitlab` | tidak ditampilkan | 15.10 minta informasi kontak yang tetap sederhana. Lima baris sosial identik di bawah satu kalimat adalah daftar link, bukan cara untuk menghubungi |
| `year: "2026"` | dibaca dari jam | Tahun yang diketik ke file data adalah tahun yang diam-diam salah setiap Januari dan tidak ada yang menandai |

Yang tampil: `mailto:rifqiagha7@gmail.com` sebagai CTA utama, github dan
situs di bawahnya sebagai dua pintu masuk lain, serta `SEMARANG, INDONESIA`
di footer. Nol kontrol mati, nol 404.

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

-   Apakah ini terasa seperti portfolio sakhandaru?
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
> perlahan memperkenalkan siapa sakhandaru, apa yang dia bangun, bagaimana
> dia sampai di sana, bagaimana dia berpikir, dan akhirnya bagaimana aku
> bisa menghubunginya."**

Semua keputusan desain harus mengarah ke perasaan tersebut.
