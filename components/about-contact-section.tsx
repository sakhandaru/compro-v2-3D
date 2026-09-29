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
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div ref={aboutWrapperRef} className="relative z-0">
        <About />
      </div>
      <div
        ref={contactWrapperRef}
        className="relative z-10 bg-[#f7f6f2] shadow-[0_-24px_48px_rgba(0,0,0,0.08)] border-t border-zinc-300"
      >
        <Contact />
      </div>
    </div>
  );
}
