import type { Metadata } from "next";
import { Geist, Geist_Pixel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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

export const metadata: Metadata = {
  title: "sakhandaru",
  description: "ui/ux designer. full-stack developer. delivering business value, architecting for scale.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistPixel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
