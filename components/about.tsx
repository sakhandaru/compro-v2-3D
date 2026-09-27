import { ABOUT_BLOCKS, ABOUT_STATEMENT, CERTIFICATIONS, SKILLS } from "@/components/about-content";

/**
 * DESIGN..md 15.9. The calmest section on the page.
 *
 * It answers "who is the person behind all this work", and 15.9 is blunt about
 * what that is not: not a second CV. So there is no skills array, no percentages,
 * no job list, no avatar. Those are all explicitly on the avoid list, and every
 * one of them is the thing a portfolio reaches for when it has nothing to say
 * about a person.
 *
 * Composition is editorial and asymmetric rather than symmetrical: a narrow rail
 * on the left holding one small mono label, and a wide column beside it holding
 * the actual sentence. That rail is the same left axis the Timeline reads down,
 * so this section is the quiet continuation of the same line rather than a new
 * idea, and it is why there is no rule about "subtle grid" here: the structure
 * comes from the rail and from thin dividers between blocks, and adding a grid
 * pattern on top of that would be decoration, which R-07 rules out without a
 * reason.
 *
 * Nothing here moves. The Hero, the portal and the Timeline all move, and a
 * section that is meant to feel like the calmest thing on the page should not
 * compete with them for attention. MOTION is dial 2 on this page, and a static
 * editorial block is a legitimate break in the rhythm rather than a missing
 * animation.
 */
export default function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative bg-[#f7f6f2] px-5 py-[18vh] sm:px-8 sm:py-[22vh]"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <h2
          id="about-heading"
          className="font-display pixel-dense mt-10 max-w-[30ch] text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.08] tracking-[-0.02em] text-zinc-900"
        >
          {ABOUT_STATEMENT}
        </h2>

        <div className="mt-[12vh]">
          {ABOUT_BLOCKS.map((block, blockIndex) => (
            <div
              key={blockIndex}
              className={`grid gap-6 border-t border-zinc-300 py-10 sm:py-14 ${
                block.label ? "sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-10" : ""
              }`}
            >
              {block.label ? (
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                    {block.label}
                  </p>
                  {block.note ? (
                    <p className="mt-2 max-w-[24ch] font-mono text-[11px] leading-[1.5] tracking-[0.18em] text-zinc-600">
                      {block.note}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div>
                {block.heading ? (
                  <h3 className="font-display pixel-dense max-w-[26ch] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.1] tracking-[-0.02em] text-zinc-900">
                    {block.heading}
                  </h3>
                ) : null}

                {block.body ? (
                  <p
                    className={`max-w-[54ch] text-[0.9375rem] leading-[1.65] text-zinc-700 ${
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
                        <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-900">
                          {item.term}
                        </dt>
                        <dd className="text-[0.9375rem] leading-[1.6] text-zinc-700">
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
          {SKILLS.length > 0 ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-4 border-t border-zinc-300 py-10 sm:py-14">
              {SKILLS.map((skill) => (
                <li key={skill.name} className="flex items-center gap-2">
                  {/*
                    An img and not an inline svg. Inlining twenty marks would mean
                    twenty copies of the path data in the bundle, and an external
                    <use> only resolves against a sprite that has a fragment id,
                    which these files do not have, so it would render nothing at all.
                    The icons are 24x24 and about 4KB, so twenty requests is not a
                    problem worth solving with a build step.
                  */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={skill.icon} alt="" width={16} height={16} className="h-4 w-4 shrink-0" />
                  <span className="text-[0.9375rem] leading-none text-zinc-900">
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {CERTIFICATIONS.length > 0 ? (
            <div className="grid gap-6 border-t border-zinc-300 py-10 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-10 sm:py-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                certifications
              </p>

              <ul className="max-w-[58ch]">
                {CERTIFICATIONS.map((cert) => (
                  <li
                    key={cert.name}
                    className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-5 border-b border-zinc-200 py-4 first:border-t first:border-zinc-200 last:border-b-0"
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
                    ) : (
                      <span aria-hidden className="block h-11 w-11" />
                    )}

                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-900">
                        {cert.name}
                      </p>
                      <p className="mt-1.5 text-[0.9375rem] leading-[1.5] text-zinc-700">
                        {[cert.issuer, cert.year].filter(Boolean).join(" \u00b7 ")}
                      </p>
                      {cert.credentialId ? (
                        <p className="mt-1 font-mono text-[11px] tracking-[0.18em] text-zinc-600">
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
