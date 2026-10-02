export const contactContent = {
  email: "rifqiagha7@gmail.com",

  phone: {
    display: "+62 877 1663 2356",
    href: "tel:+6287716632356",
  },

  /**
   * Baris sosial media di footer, sekaligus `sameAs` untuk JSON-LD di
   * `app/page.tsx`. Label lowercase mono tanpa ikon, satu suara dengan label
   * `~/x` yang dipakai section lain.
   *
   * Empat profil: GitLab tidak dipakai, dan alamat situs sendiri tidak perlu
   * dijual kepada orang yang sedang membacanya — mereka sudah berada di
   * dalamnya. `download cv` bukan bagian dari daftar ini karena ia bukan profil
   * di tempat lain, melainkan berkas di server ini (lihat `cv` di bawah).
   */
  channels: [
    { kind: "github", label: "github", href: "https://github.com/sakhandaru", external: true },
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
  ],

  /**
   * CV, sebagai kunci tersendiri supaya bentuknya berbeda dari channel: ini
   * berkas yang sama-sama berada di server ini, jadi ia tidak punya
   * `target="_blank"`, tidak masuk `sameAs`, dan membawa `download` sebagai
   * nama berkas hasil unduhan.
   *
   * `href` menunjuk ke `public/cv.pdf` — taruh PDF-nya di sana, dan ganti
   * `download` dengan nama yang ingin dilihat pembaca di dialog simpan.
   */
  cv: {
    kind: "cv",
    label: "download cv",
    href: "/documents/cv2.pdf",
    download: "sakhandaru-cv.pdf",
    external: false,
  },
} as const;
