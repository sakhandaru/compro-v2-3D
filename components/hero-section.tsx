"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroCanvas = dynamic(() => import("@/components/hero-canvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" aria-hidden />,
});

gsap.registerPlugin(ScrollTrigger);

/**
 * The five rows are the hero's entire vocabulary, and the order matters: name and
 * roles alternate in tone so the field reads as one texture with a rhythm, not five
 * unrelated lines. Lowercase throughout, matching the reference.
 */
const NAME = "sakhandaru";

const ROWS = [
  {
    text: "ui/ux designer",
    direction: "left",
    density: "pixel-dense",
    tone: "text-zinc-900",
    speed: 1,
  },
  {
    text: "full-stack developer",
    direction: "right",
    density: "pixel-light",
    tone: "text-zinc-900/45",
    speed: 0.95,
  },
  {
    text: NAME,
    direction: "left",
    density: "pixel-dense",
    tone: "text-zinc-900",
    speed: 1.05,
  },
  {
    text: "delivering business value",
    direction: "right",
    density: "pixel-light",
    tone: "text-zinc-900/45",
    speed: 0.97,
  },
  {
    text: "architecting for scale",
    direction: "left",
    density: "pixel-dense",
    tone: "text-zinc-900",
    speed: 1.02,
  },
] as const;

/**
 * Copies of each phrase inside one half of the loop. The track animates by exactly
 * one copy width, so this only has to be enough that one copy is wider than the
 * widest viewport, otherwise the background shows through between repeats.
 */
const REPEATS = 4;

/**
 * Pixels per second, so the marquee runs at one speed no matter how long the phrases
 * are. The previous fixed durations silently changed speed whenever the copy
 * changed: these strings are up to twice the length of the placeholders they
 * replaced, which on a fixed duration would have made the field race.
 */
const MARQUEE_SPEED = 370;

export default function HeroSection() {
  const section = useRef<HTMLElement>(null);
  const driver = useRef({ t: 0 });
  const [reduced, setReduced] = useState(false);
  const [durations, setDurations] = useState<string[]>([]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /*
    Duration comes from the measured track, not a constant. The animation travels
    exactly half the track, so one copy is half of scrollWidth, and dividing that by
    a fixed speed keeps the motion identical across rows of very different lengths.
    Measured again after the webfont lands, because the placeholder fallback is a
    different width and would otherwise lock in the wrong duration before Geist Pixel
    arrives.

    Each row then gets its own small multiplier. The spread is deliberately narrow
    and deliberately not random: the rows alternate direction, so a few percent of
    speed difference between neighbours shears the field just enough to feel
    organic, while a wide spread or a randomised one would read as a wobble or as a
    glitch on every reload. The factors are fixed so the loop phase never jumps.
  */
  useLayoutEffect(() => {
    if (reduced) return;
    const apply = () => {
      const tracks = section.current?.querySelectorAll<HTMLElement>("[data-marquee-track]");
      if (!tracks?.length) return;
      setDurations(
        Array.from(tracks, (track, i) => {
          const speed = MARQUEE_SPEED * (ROWS[i]?.speed ?? 1);
          return `${(track.scrollWidth / 2 / speed).toFixed(2)}s`;
        }),
      );
    };
    apply();
    document.fonts?.ready.then(apply).catch(() => {});
  }, [reduced]);

  useLayoutEffect(() => {
    if (reduced || !section.current) return;

    // Scroll drives the camera only. The type is not in this timeline, it runs on
    // its own clock, so the two motions stay independent instead of collapsing
    // into one scrubbed move.
    const context = gsap.context(() => {
      gsap.to(driver.current, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [reduced]);

  if (reduced) {
    // No pinning, no marquee, no camera travel. The type sits under the canvas in
    // normal flow rather than behind it, because a static wall of repeated words
    // behind the subject is just noise.
    return (
      <section className="min-h-screen bg-[#f7f6f2]">
        <div className="relative h-[58vh] min-h-[320px] w-full">
          <HeroCanvas driver={driver} reduced />
        </div>
        <div className="px-5 pt-4 pb-12 sm:px-8 sm:pb-16">
          <h1 className="font-display pixel-dense text-[clamp(1.75rem,7vw,4rem)] leading-[0.9] text-zinc-900">
            {NAME}
          </h1>
          <ul className="mt-5 max-w-[42ch] space-y-1 text-sm leading-relaxed text-zinc-600">
            {ROWS.filter((row) => row.text !== NAME).map((row) => (
              <li key={row.text}>{row.text}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={section} className="relative h-[420vh] bg-[#f7f6f2]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/*
          Order matters. The type sits below the canvas and the canvas is
          transparent, so the computer genuinely occludes the words passing
          behind it. That is the reference, and it is also what DESIGN..md 15.3
          asked for, so the earlier "DOM type on top" workaround is gone.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex flex-col justify-center overflow-hidden"
        >
          {ROWS.map((row, index) => (
            /*
              No overflow-hidden on the row. It used to be there to clip the marquee
              horizontally, but the full-bleed container above already clips to the
              frame, so the only thing the row clip was doing was slicing the glyphs:
              Geist Pixel is taller than a 0.8 line box, so every single row was
              losing the tops and bottoms of its own letters, not just the rows at
              the edges of the screen. Only the viewport should clip here.
            */
            <div key={index}>
              <div
                data-marquee-track
                className={`marquee-track ${row.direction === "left" ? "marquee-left" : "marquee-right"}`}
                style={{ animationDuration: durations[index] ?? "60s" }}
              >
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0">
                    {Array.from({ length: REPEATS }, (_, n) => (
                      <span
                        key={n}
                        className={`font-display px-[0.18em] text-[clamp(2rem,24.8vh,20rem)] leading-[0.82] whitespace-nowrap ${row.density} ${row.tone}`}
                      >
                        {row.text}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-10">
          <HeroCanvas driver={driver} reduced={reduced} />
        </div>

        {/*
          The field carries no headline, so the name is exposed here instead. It is
          the page's only h1 and it is what a screen reader, a search crawler and a
          link preview get.
        */}
        <h1 className="sr-only">{NAME}</h1>
      </div>
    </section>
  );
}
