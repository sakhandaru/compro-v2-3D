"use client";

import { useCallback } from "react";
import { contactContent } from "@/content/contact";
import { navContent } from "@/content/nav";
import { siteContent } from "@/content/site";

/**
 * DESIGN..md 15.10. The final act, and the footer, in one section because the
 * document says nothing comes after Contact.
 *
 * The section is laid out as a footer rather than as a paragraph, which is what
 * a footer actually is: a head that states where you are, a grid of columns
 * that each answer one question, and a meta line at the floor. Five decisions
 * carry the composition.
 *
 * 1. The head is asymmetric. `LET'S TALK.` takes seven of twelve columns and
 *    the page index takes four on the far right, both starting at the same
 *    line. A centered headline with a centered paragraph under it is the shape
 *    every generated contact section has, and the grid is the cheapest fix that
 *    costs nothing in legibility.
 *
 * 2. The email is the largest real control on the page. It is a `mailto:`, set
 *    in the display face at `display-lg`, which makes it the only element here
 *    that is both huge and clickable. `break-words` is load-bearing: an email
 *    address has no spaces, so on a 375px phone `display-lg` would otherwise
 *    push past the padding and clip. Wrapping is the failure that costs
 *    nothing.
 *
 * 3. The accent lands once. `#dd6a2b` is KNOB_COLOR, the one accent the
 *    terminal palette allows, and it appears on exactly one gesture: the
 *    underline of the two links that reach a person, the email and the number,
 *    on hover and on keyboard focus. It is never text. The orange measures
 *    3.17:1 on this background, which clears the 3:1 bar for non-text and fails
 *    the 4.5:1 bar for text, so it draws lines and does not spell words.
 *
 * 4. The floor moves. The old decorative email marquee is replaced by the
 *    owner's own name at 3rem to 7rem, travelling right at 60 seconds a lap and
 *    standing whole on a floor the container draws at its own baseline. That
 *    keeps the Hero callback the document asked for (repeated text, horizontal
 *    movement) and spends it on the wordmark instead of on a second copy of the
 *    address that is already three lines above it in `display-lg`. It is
 *    `aria-hidden`, in zinc-300, and the solid, focusable things sit above it,
 *    which is the same arrangement the owner accepted for the ruler ticks.
 *
 *    The floor is `0.87em` and the type is `1em` of the same clamp, both read
 *    off the container, so the ratio cannot drift between two independent
 *    values. This font puts its baseline 0.857em below the top of the line box
 *    (ascent 113, descent 33, half-leading -17 at 112px), so 0.87em leaves a
 *    sliver of floor under the feet instead of cutting them off. The first pass
 *    sized the container against the viewport instead — 64px of a 112px line,
 *    57% — which put the cut 32px above the baseline, halfway up the letter
 *    bodies, and the owner read it as a rendering fault. A wordmark that has to
 *    be explained is broken, so the cut moved down to the floor.
 *
 * 5. It fits one screen. This is the last section, so if it is taller than the
 *    viewport there is no scroll position that shows all of it at once, which is
 *    the one thing a footer cannot get away with. Four moves pay for it and none
 *    of them touch anything a person has to hit. The headline stops stacking and
 *    sits on one line, worth 92px at every desktop width, breaking to two only
 *    if a column runs out of room. `.section-top` drops from 20vh to a clamp that
 *    resolves to 40px at `lg`. `pb-32` gives 40 back at `lg`, where there is no
 *    home indicator to clear and 88px still leaves 16px under a 72px nav. The
 *    link columns wrap into rows instead of stacking, so five index entries and
 *    six channels land on two or three rows by themselves. Every link row keeps
 *    its 46px, which clears the 44px target.
 *
 *    Measured with the section scrolled fully into view: 652px at 1280x720,
 *    1366x768, 1440x800 and 2560x1440, 657px at 1440x900, 661px at 1512x982,
 *    642px at 1920x1080. The floor under the wordmark costs 33px of that budget
 *    and every desktop width still fits, worst case leaving 68px of slack.
 *    Tablet lands at 840px inside a 1024px screen, a 412x915 phone at 808px and
 *    a 390x844 phone at 840px. Below 390px the columns take one more line each
 *    and the section becomes 895px, so a 375x667 phone scrolls — which is what
 *    a footer on a phone should do anyway.
 *
 * There is no form. 15.10 allows one as a secondary interaction, but a form
 * needs somewhere to post to, and a form that cannot be submitted is a dead
 * control. A `mailto:` cannot fail, so it needs none of the empty, loading and
 * error states R-27 asks of anything that can.
 */
export default function Contact() {
  const toTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /*
    `pb-32` rather than the `pb-10` this used to carry, because the floating nav
    now owns the bottom of the viewport: bar (56) + gap (16) + whatever the home
    indicator asks for sits inside 128px, so the copyright line never scrolls
    under the plate. The clearance is space the nav claims, not section rhythm,
    which is why it lives here and not in `.section-top`.

    `lg:pb-22` takes 40 of those pixels back on a desktop, where there is no
    home indicator to clear and 88px still leaves 16px of air under a 72px nav.
    Those 40px go straight into the one screen budget.
  */
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative section-rule bg-[#f7f6f2] px-5 pb-32 sm:px-8 section-top lg:pb-22"
    >
      <div className="w-full">
        <p className="font-mono eyebrow text-zinc-600">
          {contactContent.bridge}
        </p>

        {/*
          The head. Seven columns of display type against four of index, with a
          one column gutter between them doing nothing but holding them apart.
          Both children drop to the bottom of the row so the last index entry
          and the foot of `TALK.` land on the same line instead of the index
          floating wherever its own height happens to leave it.
        */}
        <div className="mt-6 grid grid-cols-12 gap-x-6 gap-y-6">
          <h2
            id="contact-heading"
            className="col-span-12 font-display pixel-dense display-xl text-zinc-900 lg:col-span-7"
          >
            {/*
              One line, and it wraps only if the columns cannot hold it. The two
              stacked lines this used to be cost 92px of height at every desktop
              width for the sake of a break the grid already implies, and 92px is
              the difference between this section fitting a 720px laptop screen
              and not. At 1024px the line wants 448px of the 550px it is given,
              so it never actually breaks where it matters.
            */}
            {contactContent.headline.join(" ")}
          </h2>

          {/*
            The index is the footer sitemap, built from the nav's own content
            rather than a second list of strings, so an item can never exist here
            without a section behind it. `~/contact` is the current one, marked
            with `aria-current` for assistive tech and with the same `>` the menu
            draws, for everyone else. The caret box is always three units wide so
            the rows do not shift by one glyph when the current item changes.

            A wrapping row rather than a stack: five rows at 46 pixels each is
            232px and would set the height of the whole head on its own, while a
            row that wraps finds two rows at 1280px and three at 1024px by
            itself and never grows past 140. Every entry keeps its full padding,
            so each one still clears the 44px target.
          */}
          <nav
            aria-label={contactContent.columns.index}
            className="col-span-12 lg:col-span-4 lg:col-start-9"
          >
            <p className="font-mono eyebrow text-zinc-600">
              {contactContent.columns.index}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-6">
              {navContent.items.map((item) => {
                const current = item.id === "contact";
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={current ? "true" : undefined}
                      className="flex items-baseline py-[0.9375rem] font-mono eyebrow transition-colors hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
                    >
                      <span
                        aria-hidden
                        className={`inline-block w-3 ${current ? "text-zinc-900" : "text-transparent"}`}
                      >
                        &gt;
                      </span>
                      {item.path}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/*
          The direct block and the channels block, seven columns against four
          again but flipped in weight: the email carries the left where the
          headline did, and the six outside links stack on the right where the
          index did. The phone stays a `tel:` so it is tappable on the device
          where the email above is not, and the location stays text because a
          map link would be a destination nobody asked for.
        */}
        <div className="mt-6 grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono eyebrow text-zinc-600">
              {contactContent.columns.direct}
            </p>

            <a
              href={`mailto:${contactContent.email}`}
              className="mt-3 inline-block font-display pixel-dense display-lg break-words text-zinc-900 underline decoration-zinc-300 underline-offset-[10px] transition-colors hover:decoration-[#dd6a2b] focus-visible:decoration-[#dd6a2b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
            >
              {contactContent.email}
            </a>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <a
                href={contactContent.phone.href}
                className="inline-block py-3 font-mono text-[0.9375rem] text-zinc-900 underline decoration-zinc-300 underline-offset-[6px] transition-colors hover:decoration-[#dd6a2b] focus-visible:decoration-[#dd6a2b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
              >
                {contactContent.phone.display}
              </a>
              <span className="inline-block py-3 font-mono text-[0.9375rem] text-zinc-600">
                {contactContent.location}
              </span>
            </p>
          </div>

          {/*
            Everything else, from the owner's own data. A list of text links
            rather than a row of icons: six glyphs in a grid is the visual noise
            15.8 and 15.9 spent their whole length removing, and at 11 pixels a
            monospace label is readable where an icon would only be guessable.
            Same wrapping row as the index, for the same reason: six stacked
            rows would be 280px and this column would set the height of the
            section on its own.
          */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="font-mono eyebrow text-zinc-600">
              {contactContent.columns.channels}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-6">
              {contactContent.channels.map((channel) => (
                <li key={channel.href}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-block py-[0.9375rem] font-mono eyebrow text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/*
          The footer, inside the section, because 15.10 says nothing follows
          Contact. The year is read from the clock rather than typed, so it cannot
          quietly go stale. The button is a button and not an anchor to a made up
          id: it scrolls, it takes focus, and Enter and Space work without any
          code from us.
        */}
        <footer className="mt-7 flex flex-wrap items-baseline justify-between gap-4 border-t border-zinc-300 pt-6 font-mono eyebrow text-zinc-600 sm:mt-8">
          {/*
            Copyright and location read as one line on the left. Split across a
            three-item justify-between the location floats in the middle of the row
            on its own, which reads like a third button rather than a fact.
          */}
          <p>
            &copy; <time dateTime={String(new Date().getFullYear())}>{new Date().getFullYear()}</time>{" "}
            {siteContent.name}
            <span className="px-2 text-zinc-300">/</span>
            {contactContent.location}
          </p>
          <button
            type="button"
            onClick={toTop}
            className="-my-2 cursor-pointer px-1 py-[0.9375rem] transition-colors hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
          >
            {contactContent.backToTop}
          </button>
        </footer>

        {/*
          The wordmark, and the floor it stands on.

          The container owns both numbers in one declaration: `fontSize` is the
          clamp, `height` is `0.87em` of it, and the track answers with `1em`.
          That is the only arrangement where the two cannot drift apart. The
          first version clamped them independently against the viewport, so the
          floor moved whenever the type did, and at 57% of the line it sat 32px
          above the baseline — through the letter bodies, which is why it read
          as a rendering fault instead of as a gesture.

          The value comes from the font. Geist Pixel's baseline is 0.857em below
          the top of a line box set to `line-height: 1` (ascent 113, descent 33,
          half-leading -17 at 112px), so 0.87em is that baseline plus a hair: the
          letters arrive whole and the edge under them reads as a floor rather
          than as a cut. `overflow-hidden` still earns its place, catching a
          descender if the name ever grows one and clipping a track that is
          wider than the section by design.

          `line-height: 1` stays rather than the display scale's 0.9, because
          anything looser moves the baseline down and takes the floor off the
          feet again.

          Two identical copies on one track, translating exactly one copy width,
          so the loop point lands on identical pixels. It reuses the Hero's own
          marquee keyframes, which also means the reduced motion rule already
          stops it: a stopped track simply sits there, whole, still on the floor.
        */}
        <div
          aria-hidden
          className="overflow-hidden select-none sm:mt-4"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)", height: "0.87em" }}
        >
          <div
            className="marquee-track marquee-right font-display pixel-dense text-zinc-300"
            style={{
              fontSize: "1em",
              lineHeight: 1,
              animationDuration: "60s",
            }}
          >
            {[0, 1].map((copy) => (
              <span key={copy} className="pr-12">
                {siteContent.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
