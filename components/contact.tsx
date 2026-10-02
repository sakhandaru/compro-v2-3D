import { contactContent } from "@/content/contact";
import { siteContent } from "@/content/site";

/**
 * The footer, and the last act of the page. Five links across the top, the
 * name filling the floor, nothing else.
 *
 * 1. It is dark, and that is a decision rather than a preference. Every section
 *    above it is `#f7f6f2`, and a light section after a light section has no
 *    edge to close on — the page simply stops. `#08080a` is not a new colour:
 *    it is the one HERO 2 already uses for its own full-bleed section
 *    (components/hero-two.tsx:48), so the footer and that act are the two dark
 *    blocks the light page runs between, and the terminal and the nav pill
 *    (`bg-zinc-900`) sit in the same family. Two practical things come with it.
 *    The accent measures better on dark than on light: `#dd6a2b` is 3.17:1 on
 *    `#f7f6f2`, which is only enough for a line, while it is about 5.9:1 here,
 *    so the hover underline stops being the weakest colour on the page. And the
 *    giant name can be `zinc-700`, which on a light background would be a
 *    bruise and on this one is a quiet grey band.
 *
 * 2. It is tall on purpose — `60svh`, with the links at the top and the name
 *    pushed to the bottom by `mt-auto`. A floor only works if it is at the
 *    floor: the name stops at the bottom padding and the empty middle is the
 *    section's, not the layout's. `svh` rather than `vh`, because on a phone
 *    with the toolbar showing, `vh` is the taller of the two viewports and a
 *    section sized off it can be taller than the screen it has to fit.
 *
 *    Sixty percent still leaves the section shorter than every viewport, so the
 *    one screen rule holds by construction: measured, 341px at 320x568,
 *    506px at 390x844, 614px at 768x1024, 540px at 1440x900.
 *
 * 3. Five links, all the gaps the same, `download cv` third in the list.
 *
 *    From `sm` up this is one row of five with `justify-between` under it, so
 *    the four gaps are one number rather than three. It used to be two pairs
 *    pinned to the gutters with the middle link on the exact axis, and the
 *    spacing that produced was 24px inside a pair, 454px to the left of the
 *    middle and 421px to its right: evenly distributed is not what that was,
 *    and 33px of daylight between two gaps that are supposed to match is the
 *    kind of thing that is invisible until it is pointed out.
 *
 *    What even spacing gives up is the exact axis, which is the trade the two
 *    requests in this section cannot both win. The middle link sits on the
 *    centre of the page only while the two sides weigh the same, and `instagram
 *    + whatsapp` is 33px heavier than `github + linkedin` at 18px — so with the
 *    gaps equal the middle link lands 16.5px left of centre at 1440 (14.6px at
 *    16px), still midway between its own two neighbours, which is how the eye
 *    reads "centre" in a row of five. Reorder the labels so the pairs balance
 *    and both come back at once; with these four widths the closest split is
 *    9px, which is a detail, not a fix.
 *
 *    The phone cannot hold five labels on one line (413px of them against a
 *    350px column at 390), so below `sm` the list keeps the three-line
 *    arrangement instead: `basis-full` gives `download cv` a line of its own —
 *    centred — the left pair sits against the left gutter and, on the line
 *    after the middle, `ml-auto` pushes the right pair to the right gutter.
 *    Those two pairs are 24px apart inside themselves, and that is the whole
 *    point of a pair.
 *
 *    The profiles are split down the middle of the list (`Math.ceil` of half),
 *    so adding a sixth link keeps the two sides balanced instead of quietly
 *    growing one of them.
 *
 *    Each link keeps its 44px box (R-03), the labels rest at `zinc-300`, and
 *    hover and focus move them to `zinc-50` with the accent underneath. The four
 *    profiles open in a new tab; `download cv` does not, because it is a file
 *    on this server and the `download` attribute is the honest way to ask for
 *    it (content/contact.ts, `cv`).
 *
 * 4. The name is whole, and sized against its own box rather than the viewport.
 *    It used to be cut at half height, which put a straight edge through every
 *    letterform; it is now the full word, and the straight edge that is left is
 *    the section's.
 *
 *    The width comes from three numbers measured off the rendered type, because
 *    Geist Pixel does not have the bearings a proportional font has: the advance
 *    is 5.444em, the ink runs 0.036em in from the start of the line and stops
 *    0.079em before the end of it, so the ink itself is only 5.329em wide — the
 *    two sides are different by 0.043em, which is 11px at 1440 and was exactly
 *    the gap down the right-hand side that made the row above look longer than
 *    the word below it. Sizing on the advance (what `16vw` and a naive
 *    `18.35cqw` both do) therefore guarantees the right edge falls short.
 *
 *    So: `18.8cqw` sizes the ink, not the advance — 5.329 x 0.188 = 100
 *    percent of the content box — and `margin-left: -0.0357em` cancels the left
 *    bearing so the first pixel starts where `github` starts. Measured after
 *    the change: the ink lands on the right gutter at every width tested —
 *    measured within a couple of pixels of it from 320 to 2560 — against a
 *    32px and 20px padding it is therefore never close to
 *    crossing. The container query rather than `vw`, because `vw` counts the
 *    scrollbar and does not know the gutter moves from 20px to 32px at `sm`.
 *
 *    `overflow-x-clip` on the section is the belt to that pair of braces: the
 *    line box still carries the full 5.444em advance, which pokes a few pixels
 *    past its own block, and clip keeps that invisible remainder from ever
 *    becoming a horizontal scrollbar at 2560.
 *
 *    The bottom padding is `pb-28 lg:pb-12` so the ink lands 84px above the
 *    bottom edge on desktop, clear of the nav plate that overlaps it.
 *
 * 5. It fits one screen, and it has no heading. `aria-labelledby` pointed at a
 *    `contact-heading` that stopped existing when the headline went, so the
 *    section carries an `aria-label` instead: an unnamed region is worse than a
 *    section with no heading. There is no form either — every way out is a plain
 *    `href`, so there is no empty, loading or error state for R-27 to ask about.
 */
export default function Contact() {
  const profiles = contactContent.channels;
  const split = Math.ceil(profiles.length / 2);
  const left = profiles.slice(0, split);
  const right = profiles.slice(split);
  const ordered = [...left, contactContent.cv, ...right];
  const cvIndex = left.length;

  return (
    <section
      id="contact"
      aria-label="contact"
      className="relative flex min-h-[60svh] flex-col overflow-x-clip bg-[#08080a] px-5 pb-28 sm:px-8 section-top lg:pb-12"
    >
      <div className="flex w-full flex-1 flex-col">
        {/*
          Five items, one line from `sm` up: `justify-between` makes the four
          gaps equal by construction, which is the request. Below `sm` the same
          items are three lines — `basis-full` hands the middle link its own
          row so it can be centred, and `ml-auto` on the item after it parks the
          right pair against the right gutter — because five labels will not fit
          the 350px a phone has to give them.
        */}
        <ul className="flex flex-wrap gap-x-6 sm:justify-between">
          {ordered.map((channel, index) => (
            <li
              key={channel.kind}
              className={
                index === cvIndex
                  ? "flex basis-full justify-center sm:basis-auto sm:justify-start"
                  : index === cvIndex + 1
                    ? "ml-auto sm:ml-0"
                    : undefined
              }
            >
              <ChannelLink channel={channel} />
            </li>
          ))}
        </ul>

        {/*
          The name, at the bottom of the section and whole.

          `container-type: inline-size` lives on the wrapper because a container
          query unit used on the element that establishes the container would be
          asking a box for the size it has not finished having. The block below
          takes its font size in `cqw` — sized on the ink rather than the
          advance, see the notes above — and `margin-left` cancels the left
          bearing, so the first letterform lands on the same x as the links.

          `aria-hidden` and `select-none`, because it is display type carrying
          no information the five links above do not already say.
        */}
        <div className="mt-auto w-full" style={{ containerType: "inline-size" }}>
          <div
            aria-hidden
            className="select-none"
            style={{
              fontSize: "calc(18.8cqw)",
              marginLeft: "calc(-0.0357em)",
            }}
          >
            <p className="font-display pixel-dense text-zinc-700" style={{ lineHeight: 1 }}>
              {siteContent.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One of the footer's links: a profile from `channels`, or the CV.
 *
 * The union is what lets a single element decide between opening a tab and
 * downloading a file — `external` picks the target, `download` exists only on
 * the CV, and the `in` check below is the compiler keeping that honest rather
 * than the component guessing.
 */
type Channel = (typeof contactContent.channels)[number] | typeof contactContent.cv;

function ChannelLink({ channel }: { channel: Channel }) {
  return (
    <a
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noreferrer noopener" : undefined}
      download={"download" in channel ? channel.download : undefined}
      className="inline-flex min-h-11 items-center font-mono text-base text-zinc-300 underline-offset-4 transition-colors hover:text-zinc-50 hover:underline hover:decoration-[#dd6a2b] focus-visible:text-zinc-50 focus-visible:underline focus-visible:decoration-[#dd6a2b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-50 sm:text-lg"
    >
      {channel.label}
    </a>
  );
}
