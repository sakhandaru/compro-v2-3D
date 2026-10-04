"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import HeroTwo from "@/components/hero-two";
import SelectedWork from "@/components/selected-work";
import Timeline from "@/components/timeline";
import AboutContactSection from "@/components/about-contact-section";
import { heroContent } from "@/content/hero";
import { siteContent } from "@/content/site";
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

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => element.classList.toggle("hero-offview", !entry!.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
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

    /*
      Scroll drives the camera. The type is not in this timeline, it runs on its
      own clock, so the two motions stay independent instead of collapsing into
      one scrubbed move. The tween has to span the whole runway: its duration is
      measured in timeline units against the trigger, so anything under 1 stops
      the camera early and leaves a stretch where the page moves and the model
      does not answer.
    */
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

      timeline.to(driver.current, { t: 1, duration: 1 }, 0);
    }, section);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [reduced]);

  if (reduced) {
    // No pinning, no marquee, no camera travel. The type sits under the canvas in
    // normal flow rather than behind it, because a static wall of repeated words
    // behind the subject is just noise.
    return (
      <>
        <section id="home" className="min-h-screen bg-[#f7f6f2]">
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
        lands much further along the camera timeline than it did a moment ago.
        svh does not move, so the mapping holds across the bar sliding away. dvh
        on the sticky is the opposite requirement: it must always match the
        visible area exactly, or a strip of the next section peeks in when the
        bar hides.
      */}
      <section
        ref={section}
        id="home"
        className="relative h-[220svh] sm:h-[300svh] bg-[#f7f6f2]"
      >
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
          The field carries no headline, so the name is exposed here instead. It is
          the page's only h1 and it is what a screen reader, a search crawler and a
          link preview get.
        */}
        <h1 className="sr-only">{siteContent.name}</h1>
        </div>
      </section>
      {/*
        A sibling of the hero, never a child of it. The hero is a fixed runway
        several viewports tall, so anything nested inside it would collide with the
        sticky viewport instead of following it. And it is never conditionally
        rendered: revealing it on a scroll trigger would change the document height
        under the reader and yank the page out from under them.
      */}
      <HeroTwo />
      <SelectedWork />
      <Timeline />
      <AboutContactSection />
    </>
  );
}

