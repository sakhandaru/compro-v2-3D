export const contactContent = {
  email: "rifqiagha7@gmail.com",

  phone: {
    display: "+62 877 1663 2356",
    href: "tel:+6287716632356",
  },

  location: "Semarang, Indonesia",

  bridge: "THERE'S MORE TO BUILD.",

  headline: ["LET'S", "TALK."],

  backToTop: "back to top",

  /**
   * Header tiap kolom footer. Lowercase mono, satu suara dengan label `~/x`
   * yang dipakai section lain: `index` menunjuk daftar isi halaman, `direct`
   * untuk jalur yang benar-benar menghubungi orang (email, telepon, lokasi),
   * `channels` untuk tautan luar. Bukan judul kolom template, melainkan nama
   * dari isi kolom itu sendiri.
   */
  columns: {
    index: "index",
    direct: "direct",
    channels: "channels",
  },

  channels: [
    { kind: "github", label: "github", href: "https://github.com/sakhandaru", external: true },
    { kind: "gitlab", label: "gitlab", href: "https://gitlab.com/sakhandaru", external: true },
    {
      kind: "linkedin",
      label: "linkedin",
      href: "https://linkedin.com/in/sakhandaru",
      external: true,
    },
    {
      kind: "instagram",
      label: "instagram",
      href: "https://instagram.com/sakhandaru",
      external: true,
    },
    { kind: "whatsapp", label: "whatsapp", href: "https://wa.me/+6287716632356", external: true },
    {
      kind: "website",
      label: "rifqisakha.my.id",
      href: "https://www.rifqisakha.my.id",
      external: true,
    },
  ],
} as const;
