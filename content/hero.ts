import { siteContent } from "@/content/site";

export const heroContent = {
  rows: [
    { text: "ui/ux designer", direction: "left", dense: true, speed: 1 },
    { text: "full-stack developer", direction: "right", dense: false, speed: 0.95 },
    { text: siteContent.name, direction: "left", dense: true, speed: 1.05 },
    { text: "delivering business value", direction: "right", dense: false, speed: 0.97 },
    { text: "architecting for scale", direction: "left", dense: true, speed: 1.02 },
  ],

  photo: {
    src: "/photo/HERO2.webp",
    alt: "sakhandaru wearing a cum laude sash, sprawled across a row of theatre seats with his feet up, in an empty auditorium",
    placeholder: "[FOTO HERO KEDUA — BELUM DISEDIAKAN]",
  },

  greeting: [
    { from: 4, text: "good morning, sir" },
    { from: 11, text: "good afternoon, sir" },
    { from: 15, text: "good evening, sir" },
    { from: 18, text: "good night, sir" },
  ],

  headline: "welcome",

  model: {
    loading: "memuat model",
    error: "model gagal dimuat",
  },
} as const;
