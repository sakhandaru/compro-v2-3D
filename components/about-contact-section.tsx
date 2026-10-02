"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "@/components/about";
import Contact from "@/components/contact";

gsap.registerPlugin(ScrollTrigger);

export default function AboutContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutWrapperRef = useRef<HTMLDivElement>(null);
  const contactWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    if (!aboutWrapperRef.current || !contactWrapperRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: aboutWrapperRef.current,
        start: "bottom bottom",
        end: () => `+=${contactWrapperRef.current?.offsetHeight || window.innerHeight}`,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    }, containerRef);

    ScrollTrigger.refresh();

    /*
     * The start position was measured once, against a page that had not settled
     * yet, and nothing ever measured it again.
     *
     * `start: "bottom bottom"` puts the pin at `aboutBottom - viewportHeight`, so
     * it is only correct while everything above this block is the height it was
     * at that first refresh. On a phone it was not: `the-record` renders its
     * pinned branch first and swaps to the compact one a frame later
     * (components/timeline.tsx:194), which pulls this block up by 2160px. The
     * trigger kept the old number — start 9270, end 10110 — against a document
     * 7949px tall, so the pin lived entirely past the end of the page and never
     * fired. The section scrolled like an ordinary footer.
     *
     * GSAP only refreshes on load, resize and visibility change, and a React
     * re-render is none of those, so a page whose height changes after mount
     * needs to say so. The observer watches the body for that height change.
     *
     * The height is compared rather than trusted: a refresh removes and
     * re-inserts every pin spacer, so its own work moves the box it is watching.
     * Re-reading the height after the refresh means the second pass sees no
     * difference and stops. Without that check the observer and the plugin would
     * keep waking each other.
     */
    let measuredHeight = document.body.offsetHeight;
    let frame = 0;
    const onHeightChange = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (document.body.offsetHeight === measuredHeight) return;
        ScrollTrigger.refresh();
        measuredHeight = document.body.offsetHeight;
      });
    };
    const observer = new ResizeObserver(onHeightChange);
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={aboutWrapperRef} className="relative z-0">
        <About />
      </div>
      {/*
        The footer block is `#08080a` while everything above it is `#f7f6f2`,
        so the wrapper carries that colour too: during the pin the block slides
        up over About, and any edge the section itself does not cover would flash
        light. The `border-t` is gone for the same reason the section dropped
        `.section-rule` — a hairline drawn in `zinc-300` marks the boundary of a
        light block, and here the colour change is the boundary. The shadow
        stays, and reads the other way now: above a dark block it darkens the
        light section it is lifting off, which is what a cast shadow does.
      */}
      <div
        ref={contactWrapperRef}
        className="relative z-10 bg-[#08080a] shadow-[0_-32px_64px_rgba(0,0,0,0.2)]"
      >
        <Contact />
      </div>
    </div>
  );
}
