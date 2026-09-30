import type { Metadata } from "next";
import ReactDOM from "react-dom";
import { Geist_Mono, Geist_Pixel } from "next/font/google";
import "./globals.css";
import { siteContent } from "@/content/site";
import { MODEL_URL } from "@/components/terminal-palette";

// Geist Sans dicabut: tidak ada lagi teks sans di halaman ini (archived reason:
// semua konten memakai Pixel atau Mono). Body jatuh ke stack sistem sebagai
// pengaman terakhir, bukan sebagai suara desain.

// Suara instrumen: label, meta, counter, path, readout. Peran ketiga setelah
// Pixel (judul) dan Sans (prosa panjang). Sekeluarga dengan Sans, jadi tidak
// menambah karakter asing ke halaman.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The owner standardised on Geist Pixel for the whole hero, so Archivo is gone.
// ELSH is the pixel axis, registered here and set per row through
// font-variation-settings, since the family ships weight 400 only.
//
// adjustFontFallback is off because Turbopack has no override metrics for this
// family and warns while trying to derive them. The fallback is declared by hand
// instead, and the hero sets its sizes in viewport units, so a metric mismatch on
// swap cannot reflow the marquee rows.
const geistPixel = Geist_Pixel({
  variable: "--font-geist-pixel",
  subsets: ["latin"],
  axes: ["ELSH"],
  fallback: ["monospace"],
  adjustFontFallback: false,
});

/*
 * From `content/site.ts`, like everything else. The description used to be a second
 * copy of the hero's own words in this file, which is exactly the kind of duplication
 * that goes stale: change a marquee row and the search result keeps claiming the old
 * one. It is still a sentence in the content layer, but there is only one of it.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteContent.url),
  title: siteContent.title,
  description: siteContent.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteContent.name,
    title: siteContent.title,
    description: siteContent.description,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "sakhandaru, ui/ux designer and full-stack developer, in pixel type on a black terminal screen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.title,
    description: siteContent.description,
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
  authors: [{ name: siteContent.name }],
  category: "portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  ReactDOM.preload(MODEL_URL, {
    as: "fetch",
    crossOrigin: "anonymous",
    fetchPriority: "high",
  });

  return (
    <html
      lang={siteContent.lang}
      className={`${geistPixel.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
