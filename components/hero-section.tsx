"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import HeroTwo from "@/components/hero-two";
import SelectedWork from "@/components/selected-work";
import Timeline from "@/components/timeline";
import AboutContactSection from "@/components/about-contact-section";
import PortalLoader, { type PortalHandle } from "@/components/portal-loader";
import { heroContent } from "@/content/hero";
import { siteContent } from "@/content/site";
import {
  PORTAL_FADE,
  PORTAL_START,
} from "@/components/terminal-palette";
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
  const [nodes, setNodes] = useState<PortalHandle>({
    fill: null,
  });
  /*
    Dismissed once the load completes: the loader shows exactly once per page
    load, never again on the way back up. Separate from the latch below, which
    guards the fill value itself; this guards the overlay's existence.
  */
  const [dismissed, setDismissed] = useState(false);
  /*
    The latch. Once the fill has reached the end it stays there, so scrolling back up
    does not empty the screen and slam the portal shut on work the reader has already
    seen. A ref guards the state update because onComplete can fire again on a second
    forward pass.
  */
  const latched = useRef(false);

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
          const speed = MARQUEE_SPEED * (heroContent.rows[i]?.speed ?? 1);
          return `${(track.scrollWidth / 2 / speed).toFixed(2)}s`;
        }),
      );
    };
    apply();
    document.fonts?.ready.then(apply).catch(() => {});
  }, [reduced]);

  useLayoutEffect(() => {
    if (reduced || !section.current) return;

    // Scroll drives the camera and the portal fill. The type is not in this
    // timeline, it runs on its own clock, so the two motions stay independent
    // instead of collapsing into one scrubbed move.
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      /*
        Phase one is the camera, and it is over before the loader appears. 15.4
        wants the black screen to become the portal, and a portal only reads as a
        surface if it has stopped moving; a loader drawn over a computer that is
        still growing looks like a sticker.
      */
      timeline.to(driver.current, { t: 1, duration: PORTAL_START }, 0);

      const portal = section.current?.querySelector("[data-portal]");
      if (portal) timeline.fromTo(portal, { opacity: 0 }, { opacity: 1, duration: PORTAL_FADE }, PORTAL_START);

      /*
        The fill is written straight to the nodes instead of being tweened on them.
        Two reasons: the readout is text, which cannot be tweened, and the latch
        needs to override the scrubbed value, which a tween on the element would
        fight. One writer, one source of truth.
      */
      const fill = { value: 0 };
      timeline.to(
        fill,
        {
          value: 1,
          duration: 1 - PORTAL_START,
          onUpdate: () => {
            const value = latched.current ? 1 : fill.value;

            /*
              The fill, written as a width on the inner bar. Floored at two
              percent once moving, so the very first pixel of scroll shows life:
              a reader scrolling an entirely empty outline wonders whether
              anything is happening.
            */
            if (nodes.fill) {
              const percent = value <= 0 ? 0 : Math.max(2, value * 100);
              nodes.fill.style.width = `${percent.toFixed(1)}%`;
            }
          },
          onComplete: () => {
            if (latched.current) return;
            latched.current = true;
            setDismissed(true);
          },
        },
        PORTAL_START,
      );
    }, section);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [reduced, nodes]);

  if (reduced) {
    // No pinning, no marquee, no camera travel. The type sits under the canvas in
    // normal flow rather than behind it, because a static wall of repeated words
    // behind the subject is just noise.
    return (
      <>
        <section className="min-h-screen bg-[#f7f6f2]">
        <div className="relative h-[58vh] min-h-[320px] w-full">
          <HeroCanvas driver={driver} reduced />
        </div>
        <div className="px-5 pt-4 pb-12 sm:px-8 sm:pb-16">
          <h1 className="font-display pixel-dense display-lg text-zinc-900">
            {siteContent.name}
          </h1>
          <ul className="mt-5 max-w-[42ch] space-y-1 font-mono text-sm leading-relaxed text-zinc-600">
            {heroContent.rows.filter((row) => row.text !== siteContent.name).map((row) => (
              <li key={row.text}>{row.text}</li>
            ))}
          </ul>
          </div>
        </section>
        <HeroTwo />
        <SelectedWork />
        <Timeline />
        <AboutContactSection />
      </>
    );
  }

  return (
    <>
      {/*
        Runway in svh, sticky in dvh, and the difference is the whole point.
        A vh runway is proportional to the viewport, so when the mobile URL bar
        collapses the runway loses a full viewport of length and the same scrollY
        lands much further along the timeline. Measured: the portal fill jumped from
        093 to 100 mid-fill on an 844 to 700 pixel viewport change, which on a real
        phone is every time the bar slides away. svh does not move, so the mapping
        holds. dvh on the sticky is the opposite requirement: it must always match the
        visible area exactly, or a strip of the next section peeks in when the bar
        hides.
      */}
      <section ref={section} className="relative h-[600svh] bg-[#f7f6f2]">
      <div className="sticky top-0 h-dvh overflow-hidden">
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
          {heroContent.rows.map((row, index) => (
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
                        className={`font-display px-[0.18em] text-[clamp(2rem,24.8vh,20rem)] leading-[0.82] whitespace-nowrap ${row.dense ? "pixel-dense" : "pixel-light"} ${row.dense ? "text-zinc-900" : "text-zinc-900/45"}`}
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
          Sits on top of the canvas, not after it. The loader belongs to the screen
          the camera has flown into, and the canvas is the only thing that can supply
          that surface, so anything placed in a separate section would land on the
          warm page background instead of on black.
        */}
        <PortalLoader onNodes={setNodes} dismissed={dismissed} />

        {/*
          The field carries no headline, so the name is exposed here instead. It is
          the page's only h1 and it is what a screen reader, a search crawler and a
          link preview get.
        */}
        <h1 className="sr-only">{siteContent.name}</h1>
        </div>
      </section>
      {/*
        A sibling of the hero, never a child of it. The hero is a fixed 600vh runway,
        so anything nested inside it would collide with the sticky viewport instead of
        following it. And it is never conditionally rendered: hiding it until the fill
        completed would change the document height under the reader and yank the page
        out from under them. Reaching it already requires scrolling past the whole
        fill, so it cannot be reached unopened.
      */}
      <HeroTwo />
      <SelectedWork />
      <Timeline />
      <AboutContactSection />
    </>
  );
}

