import { aboutContent } from "@/content/about";
import { certificationsContent } from "@/content/certifications";
import { techstackContent } from "@/content/techstack";

/**
 * The calmest section on the page: one statement, then content sitting in
 * sharp cards rather than in bordered editorial rows.
 *
 * It answers "who is the person behind all this work", and it is blunt about
 * what that is not: not a second CV. So there is no skills array with
 * percentages, no job list, no avatar. Those are all the thing a portfolio
 * reaches for when it has nothing to say about a person.
 *
 * Cards, not rows: the profile is a dark code card, the stack a white schema
 * explorer card, both square and 2px-bordered, no shadow: the old 8px hard
 * shadow was the only one of its kind on the page, so it read as forced
 * rather than as emphasis. The dark card borrows the black the hero CRT
 * already owns, so the exception has friends. Radius is zero by decision.
 *
 * Nothing here moves. The Hero, the portal and the Timeline all move, and a
 * section that is meant to feel like the calmest thing on the page should not
 * compete with them for attention. A static block is a legitimate break in the
 * rhythm rather than a missing animation.
 *
 * The one interaction allowed here is the mobile accordion, and it is a native
 * details element rather than state: no client JS, keyboard operable by
 * default, server and client render the same closed markup, so there is
 * nothing to hydrate and nothing that can mismatch.
 */
function SkillRow({
  skill,
  index,
}: {
  skill: (typeof techstackContent.items)[number];
  index: number;
}) {
  return (
    <li className="flex items-center gap-2.5 border-b border-zinc-100 px-4 py-2 last:border-b-0">
      <span className="font-mono eyebrow tabular-nums text-zinc-500">
        {String(index + 1).padStart(2, "0")}
      </span>
      {/*
        Ikon sebagai topeng tinta: mask-image dengan warna zinc-900 agar satu
        warna dengan nama. Span dan bukan img karena mask tidak berlaku lewat
        tag img. aria-hidden karena nama sudah ada sebagai teks.

        Pengecualian: logo raster (raw) seperti pen.dev tidak bisa jadi topeng,
        area buramnya ikut jadi tinta dan keluar sebagai kotak hitam. Logo
        seperti itu tampil apa adanya lewat img kecil, karena logo asli yang
        benar lebih penting dari seragam yang rusak.
      */}
      {"raw" in skill && skill.raw ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={skill.icon}
          alt=""
          className="h-3.5 w-3.5 shrink-0 object-contain"
        />
      ) : (
        <span
          aria-hidden
          style={{
            WebkitMaskImage: `url(${skill.icon})`,
            maskImage: `url(${skill.icon})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
          className="h-3.5 w-3.5 shrink-0 bg-zinc-900"
        />
      )}
      <span className="mono-copy leading-none text-zinc-900">
        {skill.name}
      </span>
    </li>
  );
}
export default function About() {
  /*
    A certification logo is somebody else's brand mark, so a logo column is only
    worth reserving when at least one entry actually has one. With none, the column
    was a 44px empty gutter down the side of every row and read as a missing image
    rather than as a deliberate absence.
  */
  const hasLogos = certificationsContent.items.some((cert) => Boolean(cert.logo));

  /*
    Enam kelompok kecil, bukan satu daftar dua puluh dua. Satu tabel 22 baris
    menghabiskan hampir seribu piksel vertikal untuk informasi yang sebenarnya
    enam kelompok 1-6 nama, jadi tiap kategori jadi mini-tabelnya sendiri di
    satu kartu schema explorer. Urutan tetap sesuai data, dan kategori yang
    kosong tidak dirender, sama seperti pola gate array di section ini.
  */
  const tableOrder = [
    { key: "language", table: "public.languages" },
    { key: "framework", table: "public.frameworks" },
    { key: "database", table: "public.databases" },
    { key: "tool", table: "public.tools" },
    { key: "design", table: "public.design" },
    { key: "productivity", table: "public.productivity" },
  ] as const;
  const tables = tableOrder
    .map((entry) => ({
      ...entry,
      items: techstackContent.items.filter(
        (skill) => skill.category === entry.key,
      ),
    }))
    .filter((table) => table.items.length > 0);
  const rowCount = tables.reduce((sum, table) => sum + table.items.length, 0);

  /*
    Baris-baris profil untuk kartu kode: kunci sebagai terang, nilai sebagai
    redup, supaya satu map cukup untuk semua field string tanpa JSX berulang.
  */
  const profileEntries: [string, string][] = [
    ["role", aboutContent.profile.role],
    ["workingOn", aboutContent.profile.workingOn],
    ["learning", aboutContent.profile.learning],
    ["funFact", aboutContent.profile.funFact],
    ["quote", aboutContent.profile.quote],
  ];

  /*
    skills opsional di content: baris "skills: [...]" hanya dirender kalau
    diisi. Default kosong supaya mengosongkan atau mengomentarnya di content
    tidak membuat SSR jatuh. Halaman ini static, jadi error di sini jadi 500
    untuk semua pengunjung, bukan cuma satu baris yang hilang.
  */
  const profileSkills: readonly string[] =
    (aboutContent.profile as { skills?: readonly string[] }).skills ?? [];

  return (
    <section
      aria-labelledby="about-heading"
      className="relative section-rule bg-[#f7f6f2] px-5 sm:px-8 section-y"
    >
      <div className="w-full">
        <p className="font-mono eyebrow text-zinc-600">~/about</p>
        <h2
          id="about-heading"
          className="font-display pixel-dense display-lg mt-6 max-w-[26ch] text-zinc-900"
        >
          {aboutContent.statement}
        </h2>

        <div className="mt-12 grid gap-6 sm:mt-16">
          {/*
            Profil sebagai kartu kode gelap, bukan paragraf.

            Alasannya: referensi owner menampilkan bio sebagai const di editor,
            dan satu permukaan gelap punya teman di web ini (layar CRT hero dan
            portal yang hitam), jadi ia focal point yang sah, bukan gaya
            tempelan. Isinya data asli dari content/about.ts yang dirender baris
            per baris, bukan teks tempel: ganti data di content, kartu ikut
            berubah. Dua tone zinc saja, monokrom seperti referensi. Statis dan
            read-only, section ini tetap yang paling tenang. Baris panjang
            melipat di HP (soft wrap) supaya tidak ada scroll samping, dan
            kembali satu baris ala editor mulai sm. Pembungkus kartu wajib
            min-w-0: scroll container (pre, SQL bar) menyumbang min-content
            selebar isinya ke grid induk, dan tanpa min-w-0 kolom grid ikut
            melebar 699px di viewport 390px.
          */}
          <div className="min-w-0">
            <div className="border-2 border-zinc-900 bg-zinc-900">
              <div className="flex items-center justify-between gap-4 border-b border-zinc-700 px-4 py-2.5 sm:px-5">
                <p className="truncate font-mono eyebrow text-zinc-300">
                  ~/{aboutContent.profile.file}
                </p>
                <p className="shrink-0 font-mono eyebrow text-zinc-400">
                  read-only
                </p>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.7] whitespace-pre-wrap break-words sm:p-5 sm:whitespace-pre sm:break-normal">
                <code>
                  <span className="block">
                    <span className="text-zinc-50">const</span>
                    <span className="text-zinc-400">
                      {" "}
                      {aboutContent.profile.name} = {"{"}
                    </span>
                  </span>
                  {profileEntries.map(([key, value]) => (
                    <span key={key} className="block">
                      <span className="text-zinc-50">{"  "}{key}</span>
                      <span className="text-zinc-400">: &quot;{value}&quot;,</span>
                    </span>
                  ))}
                  {profileSkills.length > 0 ? (
                    <span className="block">
                      <span className="text-zinc-50">{"  "}skills</span>
                      <span className="text-zinc-400">: [</span>
                      {profileSkills.map((skill, skillIndex) => (
                        <span key={skill} className="text-zinc-400">
                          &quot;{skill}&quot;
                          {skillIndex < profileSkills.length - 1 ? ", " : ""}
                        </span>
                      ))}
                      <span className="text-zinc-400">],</span>
                    </span>
                  ) : null}
                  <span className="block">
                    <span className="text-zinc-400">{"};"}</span>
                  </span>
                  <span className="block" aria-hidden="true">
                    {"\u00A0"}
                  </span>
                  <span className="block">
                    <span className="text-zinc-50">const</span>
                    <span className="text-zinc-400">
                      {" "}
                      {aboutContent.principles.name} = [
                    </span>
                  </span>
                  {aboutContent.principles.items.map((principle) => (
                    <span key={principle} className="block">
                      <span className="text-zinc-400">
                        {"  "}&quot;{principle}&quot;,
                      </span>
                    </span>
                  ))}
                  <span className="block">
                    <span className="text-zinc-400">];</span>
                  </span>
                </code>
              </pre>
            </div>
          </div>

          {/*
            Certifications, under the skills.

            Gated on the array being non-empty rather than on a flag. An empty
            array is the cleanest way to keep something off a page: there is no
            hidden markup to trip over later, and no boolean to forget to flip back
            when the real entries arrive.
          */}
          {/*
            Skills sebagai schema explorer, bukan satu tabel panjang.

            Alasannya: satu tabel 22 baris adalah satu kolom informasi setinggi
            hampir seribu piksel, mubazir untuk enam kelompok kecil. Enam
            mini-tabel dalam satu kartu memangkas tinggi ke sekitar seperempat
            tanpa membuang metafora database: toolbar schema, SQL bar
            information_schema, dan status bar tetap bicara bahasa table editor,
            satu bahasa dengan mono data, baris editorial, dan counter tabular
            di sisa web. Tidak ada yang bergerak, tidak ada filter ber-state,
            section ini tetap yang paling tenang.
          */}
          {tables.length > 0 ? (
            <div className="min-w-0">
              {techstackContent.label ? (
                <p className="mb-6 font-mono eyebrow text-zinc-600">
                  ~/{techstackContent.label}
                </p>
              ) : null}

              <div className="border-2 border-zinc-900 bg-white">
                <div className="flex items-center justify-between gap-4 border-b-2 border-zinc-900 px-4 py-3 sm:px-5">
                  <p className="truncate font-mono eyebrow text-zinc-900">
                    {techstackContent.schema}
                  </p>
                  <p className="shrink-0 font-mono eyebrow tabular-nums text-zinc-600">
                    {tables.length} tables · {rowCount} rows
                  </p>
                </div>

                {/*
                  Query melipat di HP, satu baris mulai sm: pola yang sama
                  dengan kartu kode, supaya tidak ada scroll samping dan tidak
                  ada teks yang terpotong tanpa aba-aba.
                */}
                <div className="overflow-x-auto border-b border-zinc-200 bg-[#f7f6f2] px-4 py-2.5 sm:px-5">
                  <p className="font-mono text-[13px] leading-[1.5] text-zinc-700 sm:whitespace-nowrap">
                    <span className="text-zinc-500">SQL</span>
                    <span aria-hidden className="text-zinc-500">{"  ·  "}</span>
                    {techstackContent.query}
                  </p>
                </div>

                {/*
                  Hairline 1px zinc-200 antar mini-tabel, bukan 2px tinta:
                  pemisah dalam harus mundur terhadap frame luar border-2
                  zinc-900. Kalau bobotnya sama, sekat dalam ikut teriak dan
                  kartu kehilangan bingkainya. Satu bahasa dengan border-b
                  baris di dalam tiap mini-tabel.
                */}
                {/*
                  Dua wujud satu data: accordion di HP, grid di sm ke atas.

                  Alasannya: enam tabel menumpuk setinggi hampir dua ribu piksel
                  di HP, jadi tiap tabel jadi details yang bisa dilipat, tabel
                  pertama terbuka sebagai contoh isi. Di sm ke atas semuanya
                  tetap terlihat sekaligus seperti table editor. Satu map data,
                  satu komponen baris, tidak ada duplikasi isi.
                */}
                <ul className="grid gap-px bg-zinc-200 sm:hidden">
                  {tables.map((table, tableIndex) => (
                    <li key={table.table} className="bg-white">
                      <details
                        open={tableIndex === 0}
                        className="group"
                      >
                        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 [&::-webkit-details-marker]:hidden">
                          <span className="truncate font-mono eyebrow text-zinc-900">
                            {table.table}
                          </span>
                          <span className="flex shrink-0 items-center gap-3">
                            <span className="font-mono eyebrow tabular-nums text-zinc-600">
                              {table.items.length} rows
                            </span>
                            <span
                              aria-hidden
                              className="font-mono eyebrow text-zinc-500 group-open:hidden"
                            >
                              +
                            </span>
                            <span
                              aria-hidden
                              className="hidden font-mono eyebrow text-zinc-500 group-open:inline"
                            >
                              −
                            </span>
                          </span>
                        </summary>
                        <ul className="border-t border-zinc-200">
                          {table.items.map((skill, index) => (
                            <SkillRow
                              key={skill.name}
                              skill={skill}
                              index={index}
                            />
                          ))}
                        </ul>
                      </details>
                    </li>
                  ))}
                </ul>
                <ul className="hidden gap-px bg-zinc-200 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                  {tables.map((table) => (
                    <li key={table.table} className="bg-white">
                      <div className="flex items-baseline justify-between gap-3 border-b border-zinc-200 px-4 py-2">
                        <p className="truncate font-mono eyebrow text-zinc-900">
                          {table.table}
                        </p>
                        <p className="shrink-0 font-mono eyebrow tabular-nums text-zinc-600">
                          {table.items.length} rows
                        </p>
                      </div>
                      <ul>
                        {table.items.map((skill, index) => (
                          <SkillRow
                            key={skill.name}
                            skill={skill}
                            index={index}
                          />
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between gap-4 border-t-2 border-zinc-900 px-4 py-2.5 sm:px-5">
                  <p className="font-mono eyebrow tabular-nums text-zinc-600">
                    {tables.length} tables · {rowCount} rows
                  </p>
                  <p className="truncate font-mono eyebrow text-zinc-600">
                    schema: {techstackContent.schema}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {certificationsContent.items.length > 0 ? (
            <div className="grid gap-6 border-t border-zinc-300 py-10 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-10 sm:py-12">
              <p className="font-mono eyebrow text-zinc-600">
                ~/{certificationsContent.label}
              </p>

              <ul className="max-w-[58ch]">
                {certificationsContent.items.map((cert) => (
                  <li
                    key={cert.name}
                    className={`grid items-center gap-5 border-b border-zinc-200 py-4 first:border-t first:border-zinc-200 last:border-b-0 ${
                      hasLogos ? "grid-cols-[2.75rem_minmax(0,1fr)]" : ""
                    }`}
                  >
                    {cert.logo ? (
                      /*
                        alt is empty on purpose. The credential name sits right
                        beside it as real text, so the logo carries no information
                        the reader does not already have, and announcing it twice
                        just makes a screen reader say the name twice.
                      */
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cert.logo} alt="" className="h-11 w-11 object-contain" />
                    ) : null}

                    <div>
                      <p className="font-mono eyebrow text-zinc-900">
                        {cert.name}
                      </p>
                      <p className="mt-1.5 mono-copy leading-[1.5] text-zinc-700">
                        {[cert.issuer, cert.year].filter(Boolean).join(" \u00b7 ")}
                      </p>
                      {cert.credentialId ? (
                        <p className="mt-1 font-mono eyebrow text-zinc-600">
                          ID {cert.credentialId}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
