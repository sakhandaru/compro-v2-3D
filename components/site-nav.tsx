"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { contactContent } from "@/content/contact";
import { navContent } from "@/content/nav";

const items = navContent.items;

function prefersStill() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Move to a section, or report that there is nothing to move to.
 *
 * Returning a boolean is what keeps the anchors honest: the caller only calls
 * `preventDefault` when the scroll really happened, so a missing id degrades to
 * the browser's own jump instead of to a click that does nothing.
 */
function goTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;

  const behavior: ScrollBehavior = prefersStill() ? "auto" : "smooth";

  // Home is the top of the document rather than a scroll to the hero's top edge,
  // so it lands on exactly the same frame as the footer's own back-to-top.
  if (id === "home") {
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  target.scrollIntoView({ behavior, block: "start" });
  return true;
}

/**
 * The floating bottom nav: a compact bar that reads out the section you are in,
 * and a menu panel that unfolds above it.
 *
 * Bottom, not top: the hero is a full-bleed sticky runway whose top edge already
 * carries the greeting, so a header would compete with it. The bar sits in the
 * thumb's reach instead and leaves the top of the page alone.
 *
 * Terminal-sharp rather than the frosted pill of the reference it was drawn
 * from. The site has no radius and no blur, so a glass pill here would be a
 * borrowed style sitting on top of a design that spent its whole length
 * removing exactly that. Black, like the terminal screen it is imitating.
 */
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(items[0].id);
  const menuRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  /*
    Which section owns the middle of the screen.

    A band rather than an intersection count: the sections are wildly different
    heights (a 300svh hero next to a normal one), so "largest visible area" would
    keep the hero winning long after the reader left it. A thin band at the
    viewport centre is crossed by one section at a time, except on the single
    frame where two abut, and the `find` below resolves that in document order.
  */
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const next = items.find((item) => visible.has(item.id));
        if (next) setActiveId(next.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /*
    While the menu is open the page behind it is inert and cannot scroll.

    `inert` on `<main>` is what makes the focus scope real rather than
    aspirational: it removes the whole document from the focus order and from
    assistive tech, so Tab stays inside the bar and the panel with no
    hand-written trap to get wrong.

    The lock is written on `<html>` and `<body>` both, because mobile Safari is
    known to ignore `overflow: hidden` on the root element alone and let the
    document keep scrolling underneath an open menu.
  */
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    const root = document.documentElement;
    const body = document.body;

    if (open) {
      if (main) main.inert = true;
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
      root.style.overscrollBehavior = "none";
    } else {
      if (main) main.inert = false;
      root.style.overflow = "";
      body.style.overflow = "";
      root.style.overscrollBehavior = "";
    }

    return () => {
      if (main) main.inert = false;
      root.style.overflow = "";
      body.style.overflow = "";
      root.style.overscrollBehavior = "";
    };
  }, [open]);

  /*
    The dim has to cover everything the reader can see, not merely the layout
    viewport.

    On a phone the two come apart: the URL bar collapsing, a pinch zoom, or the
    root lock itself resizes one without the other, and an overlay left on bare
    `inset: 0` then shows an undimmed strip along the top or the bottom. So the
    box is measured from the union of the layout viewport and the visual
    viewport, and re-measured on every event that can move either of them.
  */
  useLayoutEffect(() => {
    if (!open) return;
    const element = scrimRef.current;
    if (!element) return;

    const visual = window.visualViewport;

    const sync = () => {
      const doc = document.documentElement;
      const offsetLeft = visual?.offsetLeft ?? 0;
      const offsetTop = visual?.offsetTop ?? 0;

      const left = Math.min(0, offsetLeft);
      const top = Math.min(0, offsetTop);
      const right = Math.max(doc.clientWidth, offsetLeft + (visual?.width ?? 0));
      const bottom = Math.max(doc.clientHeight, offsetTop + (visual?.height ?? 0));

      element.style.left = `${left}px`;
      element.style.top = `${top}px`;
      element.style.width = `${right - left}px`;
      element.style.height = `${bottom - top}px`;
    };

    sync();
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, { passive: true });
    visual?.addEventListener("resize", sync);
    visual?.addEventListener("scroll", sync);

    return () => {
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync);
      visual?.removeEventListener("resize", sync);
      visual?.removeEventListener("scroll", sync);
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    // Focus only moves if it was inside the panel, so closing from the toggle
    // never yanks the caret off a button that already has it.
    if (panelRef.current?.contains(document.activeElement)) menuRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      menuRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const follow = useCallback((event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!goTo(id)) return;
    event.preventDefault();
    setOpen(false);
    menuRef.current?.focus();
  }, []);

  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <>
      {/*
        The scrim is a sibling of the bar rather than a child of it, so it sits
        directly under `<body>`: nothing sits between it and the root stacking
        context, and no ancestor can become the containing block that would
        shrink it to the height of the bar.
      */}
      {open && (
        <div
          ref={scrimRef}
          aria-hidden
          className="nav-scrim pointer-events-auto fixed inset-0 z-40 bg-black/45"
          onClick={close}
          data-lenis-prevent
        />
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col-reverse items-center gap-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {/*
          The bar. `w-max` keeps it as tight as its own content, which is the
          point of a floating nav: it should read as a small plate parked over
          the page, not as a strip pinned across it.
        */}
        <nav
          aria-label={navContent.sections}
          className="pointer-events-auto relative z-10 flex w-max items-center gap-1 border border-zinc-600 bg-zinc-900 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
        >
          <a
            href="#home"
            title={navContent.home}
            aria-label={navContent.home}
            onClick={(event) => follow(event, "home")}
            className="flex min-h-11 min-w-11 items-center justify-center px-3 font-mono eyebrow text-zinc-50 transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-50"
          >
            ~/
          </a>

          {/*
            The readout, sized for the longest path it will ever hold. Without
            the minimum the bar would resize on every section change and the
            plate would crawl sideways under the reader's thumb.
          */}
          <p className="flex min-h-11 min-w-[7rem] items-center px-1 font-mono eyebrow tabular-nums text-zinc-400">
            <span className="truncate">{active.path}</span>
          </p>

          <button
            ref={menuRef}
            type="button"
            aria-expanded={open}
            aria-controls={open ? "site-nav-panel" : undefined}
            aria-label={open ? navContent.closeMenu : navContent.menu}
            onClick={() => (open ? close() : setOpen(true))}
            className="flex min-h-11 items-center gap-2 px-3 font-mono eyebrow text-zinc-50 transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-50"
          >
            <span>{navContent.menu}</span>
            <span aria-hidden className="text-[13px] leading-none">
              {open ? "\u00d7" : "+"}
            </span>
          </button>
        </nav>

        {/*
          The panel, mounted only while open: it is a state of the bar, so it
          should not be in the document when the state is off, and entering
          without an exit keeps the close instant. The site's motion is hover and
          scroll-reveal only, and a menu that snaps shut reads as a machine state
          change rather than as something drifting away.
        */}
        {open && (
          <div
            id="site-nav-panel"
            ref={panelRef}
            aria-label={navContent.menu}
            data-lenis-prevent
            className="nav-panel pointer-events-auto relative z-10 w-[min(22rem,calc(100vw_-_1.5rem))] border border-zinc-600 bg-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
          >
            <ul className="space-y-0.5 p-2">
              {items.map((item, index) => {
                const current = item.id === activeId;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={current ? "location" : undefined}
                      onClick={(event) => follow(event, item.id)}
                      className="flex min-h-11 items-center justify-between gap-4 px-3 font-mono eyebrow transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-50"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        {/*
                          The prompt caret marks the section you are already in.
                          It is state, not decoration: transparent rather than
                          removed so the column of paths stays aligned when it
                          appears.
                        */}
                        <span
                          aria-hidden
                          className={`w-2 shrink-0 ${current ? "text-zinc-50" : "text-transparent"}`}
                        >
                          {">"}
                        </span>
                        <span
                          className={`truncate ${current ? "text-zinc-50" : "text-zinc-300"}`}
                        >
                          {item.path}
                        </span>
                      </span>
                      <span className="shrink-0 tabular-nums text-zinc-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/*
              The two addresses a phone can act on, repeated here because this is
              the one place in the page that is reachable from any scroll
              position. Same pair, same markup shape, as the Contact section.
            */}
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-zinc-700 px-5 py-3">
              <a
                href={`mailto:${contactContent.email}`}
                className="inline-block py-3.5 font-mono eyebrow text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-50 hover:decoration-zinc-300 focus-visible:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-50"
              >
                {contactContent.email}
              </a>
              <a
                href={contactContent.phone.href}
                className="inline-block py-3.5 font-mono eyebrow text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-50 hover:decoration-zinc-300 focus-visible:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-50"
              >
                {contactContent.phone.display}
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
