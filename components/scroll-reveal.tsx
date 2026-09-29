"use client";

import React, { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TagName = "div" | "section" | "ol" | "ul" | "article" | "header" | "footer" | "span";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  as?: TagName;
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  targetChildrenSelector?: string;
  start?: string;
  ease?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  as = "div",
  y = 24,
  x = 0,
  duration = 0.8,
  delay = 0,
  stagger = 0,
  targetChildrenSelector,
  start = "top 88%",
  ease = "power3.out",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const ctx = gsap.context(() => {
      const targets = targetChildrenSelector
        ? ref.current?.querySelectorAll(targetChildrenSelector)
        : ref.current;

      if (!targets || (targets instanceof NodeList && targets.length === 0)) return;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
          x,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : undefined,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, x, duration, delay, stagger, targetChildrenSelector, start, ease]);

  return React.createElement(
    as,
    { ref, className },
    children
  );
}

