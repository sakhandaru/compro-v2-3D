"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MilestoneList from "@/components/milestone-list";
import ScrollReveal from "@/components/scroll-reveal";
import { timelineContent } from "@/content/timeline";

gsap.registerPlugin(ScrollTrigger);

/**
 * How many viewport widths the track is. Also how far it travels.
 */
const TRACKS = 4;

/**
 * The page gutter. Cards and the readout both hang off it.
 *
 * There is no wider text column any more. Every section used to be
 * `max-w-[1180px]` centred, which meant its content started at 130px on a 1440px
 * screen while HERO 2, the act directly above it, started at the 32px gutter. The
 * owner asked for the two to match and picked HERO 2 as the reference, which is
 * the right way round: the Hero and HERO 2 are full bleed, so 32px is what this
 * page already says its margin is, and four sections quietly disagreeing with the
 * two acts that establish the frame is a seam, not a grid.
 */
const GUTTER = 32;

/**
 * Where the card being read parks its left edge, as a fraction of the viewport.
 *
 * This used to be the horizontal centre of the screen, with every card centred on
 * its own position. The owner asked for the opposite: the growing card should be
 * the left one, lined up with the readout sitting below it, not the one in the
 * middle of an otherwise empty screen. So the reading axis is now the left edge
 * of the text column, and the whole section reads down that one vertical line
 * from the card to the role and organisation underneath it.
 */
function readHead() {
  return GUTTER / window.innerWidth;
}

/**
 * Whether there are enough milestones for the pinned journey to mean anything.
 *
 * The scrub hands each card an equal share of the scroll: card `i` reaches the
 * reading line at `t = i / (n - 1)`. That is the whole geometry, and it needs `n - 1`
 * to be non-zero.
 *
 * With one entry there is no such line, so the card is only ever on the reading line
 * at the very first pixel of the pin and then leaves to the left, and the section
 * becomes five hundred viewport heights of an empty ruler. Rather than special case
 * the maths, one entry simply is not pinned: it takes the same vertical list a phone
 * gets, which is the correct reading of a single milestone anyway.
 *
 * Two entries still pin. Each gets half the scroll and the middle of the pin has
 * both cards in frame, receding, which is what the falloff is for.
 */
function plenty() {
  return timelineContent.items.length > 1;
}

/**
 * How far a card has to sit from that line before it stops carrying weight.
 * Viewport widths. Cards are 0.375 apart, so anything under that makes the
 * neighbours vanish the instant they leave the column.
 */
const FALLOFF = 0.48;

/**
 * Where a card sits when it is not the one being read: 18% opaque, 87% size.
 * The active card goes to 100% and 107%, so it grows as it comes to the centre
 * and the rest recede on both axes at once. The first pass only had the active
 * card at exactly 100% and the rest stuck at 30% and 90%, which read as a flat
 * row of equally present cards rather than one card in focus.
 *
 * Scale is anchored to the bottom edge so the cards grow out of the ruler
 * instead of drifting off it.
 *
 * The 18% floor is a deliberate trade. At that opacity the card's own text drops
 * under the 4.5:1 that R-25 asks of body copy, so a card is only comfortably
 * readable while it is the active one. That matches the reference, where the
 * faded cards are scenery, and it is the reason the active card grows: the
 * reader is meant to be looking at exactly one thing.
 *
 * GROW is its own constant rather than being derived from SMALL. The first pass
 * wrote the interpolation as `SMALL + weight * (1 - SMALL)`, which is right for
 * opacity, where the active card must land on exactly 1, and wrong for scale:
 * it capped the active card at scale 1 and it never grew at all. The hovered
 * card is the one thing in the section that is supposed to get bigger.
 */
const DIM = 0.18;
const SMALL = 0.87;
const GROW = 1.07;

/** Scroll length for the whole journey. Tunable, and deliberately not enormous. */
const RUNWAY = 400;

/**
 * Evenly spaced, end to end.
 *
 * This was a real year scale: each entry sat at its own decimal date, so the four
 * last ones, which fall inside eighteen months of each other, were shoved apart by
 * a minimum gap and then rescaled. The owner looked at it and asked what the years
 * were for. Fair. The uneven gaps were carrying no meaning the reader could use,
 * they only made the section look broken, and the ruler needed a label on every
 * year to justify itself. Even spacing is what the reference actually does, and it
 * is easier to read.
 *
 * The dates stay on the cards, where they belong. Each one says when it happened.
 * The track below is just the order they happened in.
 *
 * Positions are measured inside `measure`, not at module scope, because where the
 * first card has to start depends on the width of the window: the reading line is
 * the text column, and that column is centred until it stops fitting.
 */
function measure() {
  const read = readHead();
  /*
   * One entry cannot be spaced, because `length - 1` is the number of gaps between
   * them and with a single entry that is zero. Dividing by it produced Infinity,
   * which put the one card at an infinite offset and parked it off screen: a
   * timeline with a single milestone would have shown an empty section with a
   * ruler moving on its own. A step of zero puts the lone card on the reading line,
   * which is where it belongs.
   *
   * This is reachable, not theoretical. The list is data, and deleting entries down
   * to one is an edit anyone can make in `content/timeline.ts` without opening this
   * file.
   */
  const gaps = timelineContent.items.length - 1;
  const step = gaps > 0 ? (TRACKS - 1) / (TRACKS * gaps) : 0;
  return {
    read,
    positions: timelineContent.items.map((_, i) => read / TRACKS + i * step),
  };
}

/**
 * Tick heights for the ruler, 10 to 34 pixels.
 *
 * The reference ruler is a dense band of marks of uneven length, not a comb of
 * two fixed heights, and that texture is most of what makes it read as an
 * instrument. The first cut used one short tick and one tall tick per year and
 * looked nothing like it.
 *
 * The jitter is a fixed sine hash rather than Math.random, for the same reason the
 * hero marquee is not random: the ruler has to be in the same place on every load,
 * or it shimmers on refresh and nobody can screenshot a consistent frame.
 */
const TICKS = Array.from({ length: 240 }, (_, i) => {
  const noise = Math.sin(i * 12.9898) * 43758.5453;
  return Math.round(10 + (noise - Math.floor(noise)) * 24);
});

/**
 * How far a card's left edge sits from the reading line, in viewport widths, for
 * a given scroll position. The track is TRACKS wide and slides (TRACKS - 1) of its
 * own widths, so this is the whole geometry, and every readout on screen is
 * derived from it.
 */
function distanceFromReadHead(position: number, t: number, read: number) {
  return position * TRACKS - t * (TRACKS - 1) - read;
}

/**
 * DESIGN..md 15.8. Vertical scroll drives a horizontal travel, which is the one
 * direction the content agrees with: time moves sideways, so scroll moves sideways.
 * On a list this would be a hijack, which is exactly why the same idea failed in
 * 15.6. Here it is the semantic.
 *
 * Vertical scroll is not swallowed. The scrub tween below reads the page's own scroll
 * and moves the track along, so a normal flick downward advances the journey. A
 * reference build that consumed the wheel dead was rejected for that reason.
 *
 * Below the breakpoint, and for reduced motion, this renders the same content as a
 * plain vertical list with no pinning at all. That is DESIGN..md 13's allowance for
 * mobile, and a horizontal drag is the wrong gesture on a phone.
 *
 * The ruler is the identity here and it is the reason this section can exist: a tick
 * scale reads as an instrument, and the page is already built from instruments, the
 * CRT, the raster, the scanline, the counter.
 */
export default function Timeline() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const driver = useRef({ t: 0 });
  const cards = useRef<(HTMLElement | null)[]>([]);
  const counter = useRef<HTMLParagraphElement>(null);
  const roleText = useRef<HTMLParagraphElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  // `pinned` already encodes both conditions, so reduced motion needs no separate state
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");    const sync = () => setPinned(wide.matches && !motion.matches && plenty());
    sync();
    motion.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!pinned || !section.current || !track.current) return;

    let read = 0;
    let positions: number[] = [];

    const context = gsap.context(() => {
      const remeasure = () => {
        const trackElement = track.current;
        /*
          ScrollTrigger fires onRefresh during its own teardown, which happens after
          React has already detached the ref: at 390px the pinned state drops to false
          on the first tick, the track element leaves the tree, and the refresh that
          follows used to read `track.current.style` off null and took the whole page
          down to the error boundary.
        */
        if (!trackElement) return;
        const m = measure();
        read = m.read;
        positions = m.positions;
        trackElement.style.setProperty("--inset", String(read / TRACKS));
        trackElement.style.setProperty("--step", String(positions[1]! - positions[0]!));
      };
      remeasure();

      gsap.to(driver.current, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true,
          onRefresh: remeasure,
        },
        /*
          One writer, again. The active entry, every card's weight and the year are all
          read from the same number on the same tick. A scroll listener reading this
          value is a frame behind, which is how the highlight in 15.6 once landed on
          the wrong project.

          The active entry is the card whose left edge is nearest the reading line,
          measured from the same geometry that moves the track. It used to be
          `t * last`, which assumes the cards are evenly spaced, and they are not: the
          entries follow real dates, so the last four crowd together. That put the
          readout two entries ahead of the card actually under the reader.
        */
        onUpdate: () => {
          const t = driver.current.t;

          let active = 0;
          let nearest = Infinity;
          for (let i = 0; i < positions.length; i++) {
            const distance = Math.abs(distanceFromReadHead(positions[i]!, t, read));
            if (distance < nearest) {
              nearest = distance;
              active = i;
            }
          }

          for (let i = 0; i < positions.length; i++) {
            const element = cards.current[i];
            if (!element) continue;
            const distance = Math.abs(distanceFromReadHead(positions[i]!, t, read));
            const weight = Math.max(0, 1 - distance / FALLOFF);
            element.style.opacity = (DIM + weight * (1 - DIM)).toFixed(3);
            element.style.transform = `scale(${(SMALL + weight * (GROW - SMALL)).toFixed(4)})`;
            element.style.zIndex = i === active ? "2" : "1";
          }

          const current = timelineContent.items[active]!;
          if (counter.current) {
            counter.current.textContent = `${String(active + 1).padStart(2, "0")} / ${String(timelineContent.items.length).padStart(2, "0")}`;
          }
          if (roleText.current) {
            roleText.current.textContent = current.role || current.title;
          }
          if (caption.current) {
            caption.current.textContent = [current.org, current.period].join(" · ");
          }
        },
      });

      gsap.to(track.current, {
        xPercent: -(100 - 100 / TRACKS),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [pinned]);

  const register = useCallback(
    (i: number) => (element: HTMLElement | null) => {
      cards.current[i] = element;
    },
    [],
  );

  const heading = (
    <h2
      id="timeline-heading"
      className="font-display pixel-dense display-lg text-zinc-900"
    >
      {timelineContent.heading}
    </h2>
  );
  const body = (
    <>
      <p className="font-mono eyebrow text-zinc-600">~/the-record</p>
      <div className="mt-6 flex items-end justify-between gap-6">
        {heading}
        <p className="hidden font-mono eyebrow text-zinc-600 sm:block">
          {timelineContent.items.length}{" "}
          {timelineContent.countLabel}
        </p>
      </div>
    </>
  );

  if (!pinned) {
    return (
      <section
        ref={section}
        aria-labelledby="timeline-heading"
        className="relative section-rule bg-[#f7f6f2] px-5 sm:px-8 section-y"
      >
        <div className="w-full">
          <ScrollReveal y={24}>{body}</ScrollReveal>
          <div className="mt-12 sm:mt-16">
            <MilestoneList compact />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={section}
      aria-labelledby="timeline-heading"
      className="relative section-rule bg-[#f7f6f2]"
      style={{ height: `${100 + RUNWAY}svh` }}
    >
        <div className="sticky top-0 flex h-dvh flex-col overflow-hidden">
          {/*
            One block of text, held to the left, and the whole middle of the
            screen left to the cards. That is where the section happens.
          */}
          <ScrollReveal y={24} className="w-full px-5 pt-[10vh] sm:px-8">
            <p className="font-mono eyebrow text-zinc-600">~/the-record</p>
            <div className="mt-6 flex items-end justify-between gap-6">
              <div className="max-w-[54ch]">
                <div>{heading}</div>
                <p className="mt-6 max-w-[46ch] mono-copy text-zinc-700">
                  {timelineContent.intro(timelineContent.items.length)}
                </p>
              </div>

              {/*
                The count, which belongs on desktop and was on the wrong branch for
                a while. It lives in the non-pinned body, and the non-pinned body is
                the mobile and reduced-motion one, so the comment above it claimed
                desktop while the element only ever existed on a phone. The pinned
                branch rendered `heading` on its own and skipped the count entirely.
                Same element, same place in the row, now on both.
              */}
              <p className="hidden shrink-0 font-mono eyebrow text-zinc-600 sm:block">
                {timelineContent.items.length} {timelineContent.countLabel}
              </p>
            </div>
          </ScrollReveal>

          <div className="relative mt-[5vh] flex-1 overflow-hidden">
            <div
              ref={track}
              className="absolute top-[64%] left-0 h-0"
              style={
                {
                  width: `${TRACKS * 100}%`,
                  "--inset": String(0.1125 / TRACKS),
                  "--step": String((TRACKS - 1) / (TRACKS * (timelineContent.items.length - 1))),
                } as React.CSSProperties
              }
            >
              {timelineContent.items.map((milestone, i) => (
                <div
                  key={i}
                  ref={register(i)}
                  className="absolute bottom-[2.75rem] w-[min(25rem,84vw)] origin-bottom-left"
                  style={{ left: `calc((var(--inset) + ${i} * var(--step)) * 100%)` }}
                >
                  <div className="flex items-baseline gap-3.5">
                    <p className="font-mono eyebrow text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-mono eyebrow text-zinc-600">
                      {milestone.period}
                    </p>
                  </div>
                  <h3 className="font-display pixel-dense display-md mt-3 max-w-[16ch] text-zinc-900">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 font-mono eyebrow text-zinc-600">
                    {milestone.org}
                  </p>
                  <p className="mt-3.5 max-w-[38ch] mono-copy text-zinc-700">
                    {milestone.line}
                  </p>
                </div>
              ))}

              {/*
                The ruler runs the full width of the window, not the text column, and
                the cards stand just above it.

                Marks rise from a faint line at the bottom of the band, densely and at
                uneven lengths. The first cut drew a hard line across the top with one
                short tick and one tall tick hung under it, and it read as a comb, not
                as an instrument. What makes the reference work is the texture of many
                marks at different heights with no strong line on top.

                No years. The uneven spacing that once needed a label on every year is
                gone, so a label would be claiming a scale that is not there.
              */}
              <div aria-hidden className="absolute inset-x-0 top-0 h-9">
                {TICKS.map((height, i) => (
                  <span
                    key={i}
                    className="absolute bottom-0 w-px bg-zinc-300"
                    style={{ left: `${(i / (TICKS.length - 1)) * 100}%`, height: `${height}px` }}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 h-px w-full bg-zinc-300" />
              </div>
            </div>

            {/* Readout and the year, both fixed under the ruler while the track slides. */}
            {/*
              Same column as the header and as the cards, no extra outer padding:
              the readout is the caption for whichever card is parked on the reading
              line, so its left edge has to be the same pixel. An extra `px-8` wrapper
              put it 32px short of the heading, which is the sort of thing that only
              shows up once you line the two up.
            */}
            <div className="absolute inset-x-0 top-[72%] pt-5 sm:pt-7 pb-[5vh]">
              <div className="flex w-full items-end justify-between gap-8 px-5 sm:px-8">
                <div>
                  <p
                    ref={roleText}
                    className="font-mono text-[0.8125rem] leading-[1.5] tabular-nums text-zinc-900"
                  >
                    {timelineContent.items[0]!.role || timelineContent.items[0]!.title}
                  </p>
                  <p
                    ref={caption}
                    data-caption
                    className="mt-2 font-mono eyebrow tabular-nums text-zinc-600"
                  >
                    {timelineContent.items[0]!.org}
                  </p>
                </div>
                {/*
                  Counter, not a year. The reference sets a huge year in the
                  opposite corner at barely above the background: 1.17:1 against
                  this cream, where R-25 asks 3:1 for text this size. The year was
                  already on screen twice over, in the caption below and in the
                  ruler labels, so it went and the corner got something honest
                  instead. This reads like the counter in the CRT portal, which is
                  the same instrument.
                */}
                <p
                  ref={counter}
                  data-counter
                  className="shrink-0 font-mono eyebrow tabular-nums text-zinc-600"
                >
                  01 / {String(timelineContent.items.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
