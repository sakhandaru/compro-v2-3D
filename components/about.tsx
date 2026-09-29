import { aboutContent } from "@/content/about";
import { certificationsContent } from "@/content/certifications";
import { techstackContent } from "@/content/techstack";

/**
 * The calmest section on the page: one statement, then content sitting in
 * sharp white cards rather than in bordered editorial rows.
 *
 * It answers "who is the person behind all this work", and it is blunt about
 * what that is not: not a second CV. So there is no skills array with
 * percentages, no job list, no avatar. Those are all the thing a portfolio
 * reaches for when it has nothing to say about a person.
 *
 * Cards, not rows: each block is a sharp white card on the cream, and the
 * stack is a divider grid in the same card language. Retro to match the pixel
 * voice: square corners everywhere, 2px ink borders, and exactly one hard
 * offset shadow (on the stack, the showpiece). A hard shadow is not the soft
 * float banned elsewhere on this page: it has no blur, no spread, it is print,
 * not levitation. Radius is zero by decision.
 *
 * Nothing here moves. The Hero, the portal and the Timeline all move, and a
 * section that is meant to feel like the calmest thing on the page should not
 * compete with them for attention. A static block is a legitimate break in the
 * rhythm rather than a missing animation.
 */
export default function About() {
  /*
    A certification logo is somebody else's brand mark, so a logo column is only
    worth reserving when at least one entry actually has one. With none, the column
    was a 44px empty gutter down the side of every row and read as a missing image
    rather than as a deliberate absence.
  */
  const hasLogos = certificationsContent.items.some((cert) => Boolean(cert.logo));

  return (
    <section
      aria-labelledby="about-heading"
      className="relative border-t border-zinc-300 bg-[#f7f6f2] px-5 sm:px-8 section-y"
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
          {aboutContent.blocks.map((block, blockIndex) => (
            <div
              key={blockIndex}
              className="border-2 border-zinc-900 bg-white p-6 sm:p-10"
            >
              {block.label ? (
                <div className="mb-6">
                  <p className="font-mono eyebrow text-zinc-600">
                    ~/{block.label}
                  </p>
                  {block.note ? (
                    <p className="mt-2 max-w-[24ch] font-mono eyebrow text-zinc-600">
                      {block.note}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div>
                {block.heading ? (
                  <h3 className="font-display pixel-dense display-md max-w-[26ch] text-zinc-900">
                    {block.heading}
                  </h3>
                ) : null}

                {block.body ? (
                  <p
                    className={`max-w-[54ch] mono-copy text-zinc-700 ${
                      block.heading ? "mt-6" : ""
                    }`}
                  >
                    {block.body}
                  </p>
                ) : null}

                {block.items ? (
                  <dl className="max-w-[58ch]">
                    {block.items.map((item) => (
                      <div
                        key={item.term}
                        className="grid gap-1 border-b border-zinc-200 py-4 last:border-b-0 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-8"
                      >
                        <dt className="font-mono eyebrow text-zinc-900">
                          {item.term}
                        </dt>
                        <dd className="mono-copy text-zinc-700">
                          {item.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

              </div>
            </div>
          ))}

          {/*
            Certifications, under the skills.

            Gated on the array being non-empty rather than on a flag. An empty
            array is the cleanest way to keep something off a page: there is no
            hidden markup to trip over later, and no boolean to forget to flip back
            when the real entries arrive.
          */}
          {/*
            Skills, one flat list with no grouping, so no rail, and no badge: the mark
            sits next to the name with no fill and no border around either, which is
            what keeps a row of twenty logos from turning into a wall of pills.

            The mark is hidden from assistive tech because the name is right beside it
            and the SVG carries its own <title>, so a screen reader would otherwise
            read "React" twice. Inline SVG rather than <Image>, because these are
            24x24 vectors and a rasteriser has nothing to do.
          */}
          {/*
            Skills as a divider grid in the same card language: the grid's own
            ink background shows through 2px gaps as dividers, matching the 2px
            outer border, so twenty cells read as one instrument instead of twenty
            loose items. Square corners, and the section's one hard shadow (8px
            solid, no blur) sits here on the showpiece, nowhere else.
          */}
          {techstackContent.items.length > 0 ? (
            <div>
              {techstackContent.label ? (
                <p className="mb-6 font-mono eyebrow text-zinc-600">
                  ~/{techstackContent.label}
                </p>
              ) : null}

              <ul className="grid grid-cols-2 gap-[2px] border-2 border-zinc-900 bg-zinc-900 shadow-[8px_8px_0_#18181b] sm:grid-cols-3 lg:grid-cols-4">
                {techstackContent.items.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3 bg-white p-5">
                    {/*
                      Ikon sebagai topeng, bukan gambar: SVG dipakai sebagai
                      mask-image dan warnanya tinta teks (zinc-900, sama dengan
                      nama di sebelahnya). Grayscale bukan jawabannya, karena
                      ikon brand yang di-gray tetap belang terang-gelap mengikuti
                      luminansi aslinya; topeng memberi satu warna tinta yang
                      sama persis dengan font, yang diminta owner.

                      Span dan bukan img: mask tidak bisa diterapkan lewat tag
                      img. aria-hidden karena nama sudah ada sebagai teks di
                      sebelahnya. Bukan inline svg: dua puluh salinan path data
                      di bundle lebih mahal dari dua puluh request 4KB, dan
                      <use> eksternal butuh sprite ber-fragment-id yang file-file
                      ini tidak punya.
                    */}
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
                      className="h-4 w-4 shrink-0 bg-zinc-900"
                    />
                    <span className="mono-copy leading-none text-zinc-900">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
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
