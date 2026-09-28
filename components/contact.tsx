"use client";

import { useCallback } from "react";
import { contactContent } from "@/content/contact";

/**
 * DESIGN..md 15.10. The final act, and the footer, in one section because the
 * document says nothing comes after Contact.
 *
 * The document asks for a callback to the Hero, in the Hero's own language of
 * repeated text and horizontal movement, but also for controlled typography, slow
 * movement and low density. Those read like a contradiction and they are not one,
 * as long as what changes is the scale rather than the mechanic.
 *
 * So the callback is one line of the email address drifting at 22 pixels a second,
 * which is about 6% of the Hero's 370, in zinc-300 at 1.37:1, and hidden from
 * assistive tech. Behind it sits the real, focusable, clickable `mailto:`. That
 * answers both halves at once: the movement and the repetition are the Hero's
 * grammar, the speed, the density and the contrast are Contact's. Cloning the
 * five row marquee would have satisfied the callback and broken the paragraph
 * right next to it, and it would have been a fourth heavy act on a page that
 * already pins twice.
 *
 * The faint line is decoration and the link beneath it is real, which is the same
 * arrangement the owner already accepted for the ruler ticks and for the giant
 * year that got cut: something quiet moving, something solid that works.
 *
 * There is no form. 15.10 allows one as a secondary interaction, but a form needs
 * somewhere to post to, and a form that cannot be submitted is a dead control. A
 * `mailto:` cannot fail, so it needs none of the empty, loading and error states
 * R-27 asks of anything that can.
 */
export default function Contact() {
  const toTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative bg-[#f7f6f2] px-5 pt-[16vh] pb-10 sm:px-8 sm:pt-[20vh]"
    >
      <div className="w-full">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
          {contactContent.bridge}
        </p>

        <h2
          id="contact-heading"
          className="font-display pixel-dense mt-10 text-[clamp(3rem,13vw,9rem)] leading-[0.86] tracking-[-0.04em] text-zinc-900"
        >
          {contactContent.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/*
          The callback. One line, 22 pixels a second, faint, and hidden from screen
          readers because the mailto underneath already says the same thing out
          loud. Reuses the Hero's own marquee classes rather than a second set of
          keyframes, which also means the existing reduced motion rule stops it for
          free: at this size a drifting line is still motion, and motion is exactly
          what that media query is for.
        */}
        <div aria-hidden className="mt-14 overflow-hidden sm:mt-16">
          <div
            className="marquee-track marquee-left font-display pixel-dense text-[clamp(1.5rem,4vw,3rem)] leading-none whitespace-nowrap text-zinc-300 select-none"
            style={{ animationDuration: "65s" }}
          >
            {[0, 1].map((copy) => (
              <span key={copy} className="px-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <span key={i} className="px-6">
                    {contactContent.email}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-14">
          {/*
            The two addresses a phone can act on, set on one line because they are
            one idea: how to reach a person. The number is a `tel:` and not text,
            so it is tappable on a device where the email above is not.
          */}
          <p className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <a
              href={`mailto:${contactContent.email}`}
              className="inline-block py-3 font-mono text-[0.9375rem] tracking-[0.18em] text-zinc-900 uppercase underline decoration-zinc-300 underline-offset-[6px] transition-colors hover:decoration-zinc-900 focus-visible:decoration-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
            >
              {contactContent.email}
            </a>
            <a
              href={contactContent.phone.href}
              className="inline-block py-3 font-mono text-[0.9375rem] tracking-[0.18em] text-zinc-900 uppercase underline decoration-zinc-300 underline-offset-[6px] transition-colors hover:decoration-zinc-900 focus-visible:decoration-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
            >
              {contactContent.phone.display}
            </a>
          </p>

          {/*
            Everything else, from the owner's own data. A wrapping list of text
            links rather than a row of icons: seven glyphs in a grid is the visual
            noise 15.8 and 15.9 spent their whole length removing, and at 11 pixels
            a monospace label is readable where an icon would only be guessable.
          */}
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {contactContent.channels.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-block py-[0.9375rem] font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
                >
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/*
          The footer, inside the section, because 15.10 says nothing follows
          Contact. The year is read from the clock rather than typed, so it cannot
          quietly go stale. The button is a button and not an anchor to a made up
          id: it scrolls, it takes focus, and Enter and Space work without any
          code from us.
        */}
        <footer className="mt-[16vh] flex flex-wrap items-baseline justify-between gap-4 border-t border-zinc-300 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
          {/*
            Copyright and location read as one line on the left. Split across a
            three-item justify-between the location floats in the middle of the row
            on its own, which reads like a third button rather than a fact.
          */}
          <p>
            &copy; <time dateTime={String(new Date().getFullYear())}>{new Date().getFullYear()}</time>{" "}
            sakhandaru
            <span className="px-2 text-zinc-300">/</span>
            {contactContent.location}
          </p>
          <button
            type="button"
            onClick={toTop}
            className="-my-2 cursor-pointer px-1 py-[0.9375rem] uppercase transition-colors hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
          >
            {contactContent.backToTop}
          </button>
        </footer>
      </div>
    </section>
  );
}
