# 🃏 Card Stack Animation — Implementation Guide

> Animasi kartu yang "numpuk ke atas" saat scroll atau transisi antar section.
> Cocok untuk hero → about, section transitions, atau storytelling layout.

---

## 📋 Table of Contents

1. [Konsep Dasar](#1-konsep-dasar)
2. [Pure CSS (Static Stack)](#2-pure-css-static-stack)
3. [CSS + JavaScript (Scroll-triggered)](#3-css--javascript-scroll-triggered)
4. [GSAP ScrollTrigger (Recommended)](#4-gsap-scrolltrigger-recommended)
5. [Framer Motion (React)](#5-framer-motion-react)
6. [Tips & Gotchas](#6-tips--gotchas)
7. [Variasi & Inspirasi](#7-variasi--inspirasi)

---

## 1. Konsep Dasar

### Cara kerjanya:
```
Scroll ↓
  │
  ├── Card 1 → sticky, "ketahan" di posisinya
  ├── Card 2 → muncul dari bawah, numpuk di atas Card 1
  ├── Card 3 → muncul dari bawah, numpuk di atas Card 2
  └── dst...
```

### Key CSS Properties:
| Property | Fungsi |
|---|---|
| `position: sticky` | Bikin kartu "nempel" saat scroll |
| `top: Xpx` | Offset setiap kartu (efek tumpukan) |
| `z-index` | Urutan layer kartu |
| `transform: scale()` | Efek perspektif kartu di belakang |
| `transform-origin` | Titik pusat transformasi |

---

## 2. Pure CSS (Static Stack)

Paling simpel, tanpa JavaScript. Kartu langsung tampil bertumpuk.

### HTML
```html
<section class="stack-section">
  <div class="card-stack">
    <div class="card card-1">
      <h2>Card 1 — Hero</h2>
      <p>Content pertama</p>
    </div>
    <div class="card card-2">
      <h2>Card 2 — About</h2>
      <p>Content kedua</p>
    </div>
    <div class="card card-3">
      <h2>Card 3 — Work</h2>
      <p>Content ketiga</p>
    </div>
  </div>
</section>
```

### CSS
```css
.stack-section {
  min-height: 100vh;
  padding: 4rem 2rem;
}

.card-stack {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  position: relative;
  background: #1a1a2e;
  border-radius: 24px;
  padding: 3rem;
  margin-bottom: -2rem; /* overlap ke bawah */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Setiap kartu sedikit lebih kecil + offset */
.card-1 { 
  z-index: 3; 
  transform: scale(1); 
}
.card-2 { 
  z-index: 2; 
  transform: scale(0.97) translateY(-1rem);
  opacity: 0.9;
}
.card-3 { 
  z-index: 1; 
  transform: scale(0.94) translateY(-2rem);
  opacity: 0.8;
}
```

---

## 3. CSS + JavaScript (Scroll-triggered)

Kartu muncul satu per satu saat di-scroll, **tanpa library eksternal**.

### HTML
```html
<main>
  <!-- Section tinggi untuk scroll space -->
  <div class="scroll-space"></div>

  <!-- Sticky container -->
  <section class="sticky-container">
    <div class="cards-wrapper">
      <div class="card" data-card="1">
        <span class="card-label">01</span>
        <h2>Hero Section</h2>
        <p>Deskripsi pertama.</p>
      </div>
      <div class="card" data-card="2">
        <span class="card-label">02</span>
        <h2>About Section</h2>
        <p>Deskripsi kedua.</p>
      </div>
      <div class="card" data-card="3">
        <span class="card-label">03</span>
        <h2>Work Section</h2>
        <p>Deskripsi ketiga.</p>
      </div>
    </div>
  </section>
</main>
```

### CSS
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0d0d0d;
  color: #fff;
  font-family: 'Inter', sans-serif;
}

/* Ruang untuk scroll (tinggi = jumlah kartu × 100vh) */
.scroll-space {
  height: 300vh;
}

/* Container sticky */
.sticky-container {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.cards-wrapper {
  position: relative;
  width: min(600px, 90vw);
  height: 400px;
}

/* Base card style */
.card {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1e1e2e, #2a2a3e);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);

  /* Initial state: di bawah, invisible */
  transform: translateY(100%) scale(0.8);
  opacity: 0;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 0.4s ease;
}

/* State aktif */
.card.is-visible {
  transform: translateY(0) scale(1);
  opacity: 1;
}

/* Kartu yang sudah lewat (di belakang) */
.card.is-past {
  transform: translateY(-8%) scale(0.95);
  opacity: 0.6;
  z-index: 0;
}

/* Z-index per kartu */
.card[data-card="1"] { z-index: 1; }
.card[data-card="2"] { z-index: 2; }
.card[data-card="3"] { z-index: 3; }

.card-label {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  opacity: 0.5;
  display: block;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### JavaScript
```javascript
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;

// Scroll thresholds — setiap kartu muncul di 1/3 bagian scroll space
const scrollSpace = document.querySelector('.scroll-space');

function getScrollProgress() {
  const rect = scrollSpace.getBoundingClientRect();
  const totalHeight = scrollSpace.offsetHeight;
  const scrolled = -rect.top;
  return Math.max(0, Math.min(1, scrolled / totalHeight));
}

function updateCards() {
  const progress = getScrollProgress();
  
  cards.forEach((card, index) => {
    const cardProgress = index / totalCards;
    const nextCardProgress = (index + 1) / totalCards;

    if (progress >= cardProgress) {
      // Kartu ini sudah saatnya muncul
      if (progress < nextCardProgress || index === totalCards - 1) {
        // Kartu aktif
        card.classList.add('is-visible');
        card.classList.remove('is-past');
      } else {
        // Kartu sudah lewat (jadi background)
        card.classList.remove('is-visible');
        card.classList.add('is-past');
      }
    } else {
      // Kartu belum muncul
      card.classList.remove('is-visible', 'is-past');
    }
  });
}

window.addEventListener('scroll', updateCards, { passive: true });
updateCards(); // Run on load
```

---

## 4. GSAP ScrollTrigger (Recommended)

Paling smooth dan kontrol penuh. **Best practice untuk production.**

### Install
```bash
# Via npm (React/Vue/etc)
npm install gsap

# Via CDN (HTML biasa)
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Card Stack</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="pin-container">
    <div class="cards-scene">
      <article class="card" id="card-1">
        <div class="card-inner">
          <p class="card-tag">Introduction</p>
          <h2>Hello, World 👋</h2>
          <p>Ini adalah kartu pertama.</p>
        </div>
      </article>

      <article class="card" id="card-2">
        <div class="card-inner">
          <p class="card-tag">About</p>
          <h2>Who Am I</h2>
          <p>Ini adalah kartu kedua.</p>
        </div>
      </article>

      <article class="card" id="card-3">
        <div class="card-inner">
          <p class="card-tag">Work</p>
          <h2>My Projects</h2>
          <p>Ini adalah kartu ketiga.</p>
        </div>
      </article>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

### CSS
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', sans-serif;
  background: #080810;
  color: #fff;
}

/* Pin container — diperlukan GSAP untuk sticky scroll */
.pin-container {
  /* Tinggi = viewport × jumlah kartu, beri ruang untuk scroll */
  height: 400vh;
  position: relative;
}

.cards-scene {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  position: absolute;
  width: min(640px, 88vw);
  min-height: 380px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
  will-change: transform, opacity;
}

/* Warna berbeda tiap kartu */
#card-1 { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); }
#card-2 { background: linear-gradient(135deg, #0f3460 0%, #1a1a4e 100%); }
#card-3 { background: linear-gradient(135deg, #533483 0%, #2d1b69 100%); }

.card-inner {
  padding: 3.5rem;
}

.card-tag {
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

p { 
  opacity: 0.7; 
  line-height: 1.7;
  font-size: 1.05rem;
}
```

### JavaScript (GSAP)
```javascript
gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray('.card');
const OFFSET = 12; // px offset antar kartu (efek tumpukan)

// Setup posisi awal tiap kartu
cards.forEach((card, i) => {
  gsap.set(card, {
    y: i === 0 ? 0 : '100%',  // Kartu pertama di posisi normal, lainnya di bawah
    scale: 1 - (cards.length - 1 - i) * 0.04,
    zIndex: i + 1,
  });
});

// Animasi tiap kartu masuk
cards.forEach((card, i) => {
  if (i === 0) return; // Skip kartu pertama

  const prevCards = cards.slice(0, i);

  ScrollTrigger.create({
    trigger: '.pin-container',
    start: `${(i / cards.length) * 100}% top`,
    end: `${((i + 1) / cards.length) * 100}% top`,
    scrub: 1, // 1 = smooth lag, 0 = instant
    onUpdate: (self) => {
      const progress = self.progress;

      // Kartu ini naik dari bawah
      gsap.set(card, {
        y: `${(1 - progress) * 100}%`,
        scale: 0.9 + progress * 0.1,
      });

      // Kartu sebelumnya mengecil (ke belakang)
      prevCards.forEach((prevCard, j) => {
        const depth = i - j; // Seberapa "dalam" kartu ini
        gsap.set(prevCard, {
          scale: 1 - depth * 0.04 + progress * 0.04,
          y: -depth * OFFSET * progress,
        });
      });
    },
  });
});
```

### Versi GSAP — Dengan `pin: true` (Alternatif Cleaner)
```javascript
// Alternatif: biarkan GSAP yang handle sticky
gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray('.card');

// Kalau pakai approach ini, HAPUS `position: sticky` dari .cards-scene
// dan hapus `height: 400vh` dari .pin-container

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.pin-container',
    pin: true,          // GSAP yang handle pin (sticky)
    scrub: 1,
    end: `+=${cards.length * 600}`, // scroll distance
  }
});

cards.forEach((card, i) => {
  if (i === 0) {
    gsap.set(card, { zIndex: 1 });
    return;
  }

  gsap.set(card, { yPercent: 120, zIndex: i + 1 });

  tl.to(card, {
    yPercent: 0,
    ease: 'power2.out',
  }, i * 0.5);

  // Perkecil kartu sebelumnya
  tl.to(cards.slice(0, i), {
    scale: 0.95,
    y: -10 * i,
    ease: 'power2.out',
  }, i * 0.5);
});
```

---

## 5. Framer Motion (React)

Untuk project React/Next.js.

### Install
```bash
npm install framer-motion
```

### Component
```jsx
// CardStack.jsx
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

const CARDS = [
  { id: 1, tag: 'Introduction', title: 'Hello, World 👋', body: 'Kartu pertama.', bg: '#1a1a2e' },
  { id: 2, tag: 'About', title: 'Who Am I', body: 'Kartu kedua.', bg: '#0f3460' },
  { id: 3, tag: 'Work', title: 'My Projects', body: 'Kartu ketiga.', bg: '#533483' },
];

function Card({ card, index, total, scrollYProgress }) {
  // Setiap kartu punya range scroll sendiri
  const start = index / total;
  const end = (index + 1) / total;

  const y = useTransform(scrollYProgress, [start - 0.1, start], ['100%', '0%']);
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 0.95]
  );
  const opacity = useTransform(scrollYProgress, [start - 0.1, start], [0, 1]);

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        backgroundColor: card.bg,
        position: 'absolute',
        inset: 0,
        borderRadius: 28,
        padding: '3rem',
        zIndex: index + 1,
        boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)',
      }}
    >
      <p style={{ opacity: 0.5, fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
        {card.tag}
      </p>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
        {card.title}
      </h2>
      <p style={{ opacity: 0.7, color: '#fff', lineHeight: 1.7 }}>{card.body}</p>
    </motion.div>
  );
}

export default function CardStack() {
  const containerRef = useRef(null);

  // scrollYProgress = 0 saat container masuk viewport, 1 saat keluar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `${CARDS.length * 100}vh`, position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 'min(640px, 88vw)',
            height: 380,
          }}
        >
          {CARDS.map((card, i) => (
            <Card
              key={card.id}
              card={card}
              index={i}
              total={CARDS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Penggunaan di Page
```jsx
// page.jsx atau App.jsx
import CardStack from './CardStack';

export default function Home() {
  return (
    <main>
      <section style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <h1>Welcome</h1>
      </section>

      <CardStack />

      <section style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <h1>Next Section</h1>
      </section>
    </main>
  );
}
```

---

## 6. Tips & Gotchas

### ⚡ Performance
```css
/* WAJIB tambahkan pada card yang dianimasi */
.card {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0); /* Force GPU acceleration */
}
```

### 📱 Mobile Responsiveness
```css
/* Kurangi kompleksitas animasi di mobile */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none !important;
    animation: none !important;
  }
}

/* Ukuran kartu responsif */
.card {
  width: min(640px, calc(100vw - 2rem));
  padding: clamp(1.5rem, 4vw, 3rem);
}
```

### 🔧 Common Issues

| Masalah | Solusi |
|---|---|
| Kartu jerky/tidak smooth | Tambah `scrub: 1.5` di GSAP atau `transition-timing: cubic-bezier(...)` |
| Sticky tidak bekerja | Pastikan parent **tidak** punya `overflow: hidden` |
| Z-index tidak berfungsi | Element harus punya `position: relative/absolute/fixed` |
| Scroll terlalu cepat/lambat | Adjust tinggi `.scroll-space` atau `end` di ScrollTrigger |
| FOUC (flash) saat load | Set state awal kartu dengan `gsap.set()` atau CSS sebelum animasi |

### 🎨 Efek Tambahan yang Keren
```css
/* Blur kartu di belakang */
.card.is-past {
  filter: blur(2px);
}

/* Border gradient */
.card {
  border: 1px solid transparent;
  background-clip: padding-box;
  background-image: linear-gradient(135deg, #1a1a2e, #2a2a3e);
  box-shadow: 
    0 0 0 1px rgba(255,255,255,0.1),
    0 30px 80px rgba(0,0,0,0.5);
}

/* Shimmer effect pada card aktif */
.card.is-visible::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(255,255,255,0.05) 50%,
    transparent 60%
  );
  border-radius: inherit;
}
```

---

## 7. Variasi & Inspirasi

### 🔄 Horizontal Card Stack
Ubah `translateY` → `translateX` untuk efek horizontal swipe.

### 🎭 3D Perspective Stack
```css
.cards-wrapper {
  perspective: 1000px;
}

.card.is-past {
  transform: rotateX(8deg) translateY(-5%) scale(0.95);
}
```

### 🌊 Fan/Spread Stack
```javascript
// Kartu menyebar seperti kipas
cards.forEach((card, i) => {
  const angle = (i - cards.length / 2) * 8; // derajat
  gsap.set(card, { rotate: angle, transformOrigin: 'bottom center' });
});
```

### 📌 Referensi & Inspirasi
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Framer Motion useScroll](https://www.framer.com/motion/use-scroll/)
- [Awwwards — Card Stack Examples](https://www.awwwards.com/inspiration/)
- [CodePen — Card Stack Collection](https://codepen.io/search/pens?q=card+stack+scroll)

---

## 🚀 Quick Start Checklist

- [ ] Tentukan jumlah kartu
- [ ] Hitung tinggi scroll space (`jumlah kartu × 100vh` minimum)
- [ ] Set `position: sticky` + `top: 0` pada wrapper
- [ ] Tambah `will-change: transform` pada setiap kartu
- [ ] Test di mobile (ukuran + performa)
- [ ] Tambah `prefers-reduced-motion` fallback
- [ ] Pastikan parent tidak punya `overflow: hidden`

---

*Last updated: September 2026*
