"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { isSceneReady, subscribeSceneReady } from "@/components/scene-ready";
import { screenRect } from "@/components/screen-rect";

/** Below this the hold reads as a flash rather than as a machine taking a beat. */
const MIN_HOLD = 900;
/**
  The ceiling on the hold. The model and the fonts usually land well under it,
  but on a connection where they do not, the veil stops being a cover for
  unrendered assets and becomes a broken page. Past this it lifts anyway and the
  model's own loading line catches whatever is still coming.
*/
const MAX_HOLD = 3500;
/** Mirrors `entrance-lift` in globals.css. The two timelines have to agree. */
const LIFT_MS = 2000;
/** Share of the lift the collapse gets; the last sliver is the dot letting go. */
const CLIP_SHARE = 0.88;
/**
  Where the collapse stops: a fraction of the plate's own size, so it ends
  inside the screen rather than on it. Stopping at the plate is what made the
  black die at full size — a screen-shaped rectangle fading out reads as
  something vanishing, while a rectangle that keeps shrinking past the screen
  reads as something being drawn into it.
*/
const TARGET_SCALE = 0.12;

const NAV_KEYS = ["Tab", " ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];

/** Nothing to subscribe to: the preference cannot change mid page view. */
function subscribePreference() {
  return () => {};
}

function prefersStill() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersMotion() {
  return false;
}

/**
  `cubic-bezier(0.45, 0, 0.25, 1)` solved by bisection, so the collapse the
  entrance draws by hand matches the curve the stylesheet uses on the opacity.
  Two easings that disagree would show up as the black arriving at the screen
  before or after it starts dissolving.
*/
function revealEase(t: number) {
  const x1 = 0.45;
  const y1 = 0;
  const x2 = 0.25;
  const y2 = 1;
  let lo = 0;
  let hi = 1;
  let u = t;
  for (let i = 0; i < 18; i++) {
    u = (lo + hi) / 2;
    const x = 3 * (1 - u) * (1 - u) * u * x1 + 3 * (1 - u) * u * u * x2 + u * u * u;
    if (x < t) lo = u;
    else hi = u;
  }
  return 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u;
}

/**
  The black in front of the computer, then the black going into its screen.

  Two beats:

  1. Hold. A flat veil in the terminal screen's own colour — the exact value the
     3D screen plate is painted — so the first thing on screen is the computer's
     screen rather than a graphic. It stays until the assets it exists to hide
     are really there: the model, the webfonts. Its whole job is this, so the
     length is decided by the assets rather than by a duration.
  2. Collapse. The veil clips down onto the plate itself: the render loop
     publishes where the plate is every frame, and the veil's inset chases that
     rectangle while the opacity dissolves. What the reader sees is the darkness
     being drawn into the screen of the machine it was standing in front of, and
     when it lets go the plate it was sitting on is what remains.

  ## It fails towards an empty page, never towards a stuck one

  The colour is on `.entrance-veil`, whose base opacity is 0: the keyframes are
  what turn it on and off. No stylesheet, no keyframe support, no hydration —
  and the veil has never been black, the site is simply there. The collapse is
  strictly an enhancement on top: it is written frame by frame from JavaScript,
  so if the model never arrives or the scene fails, the clip simply never
  happens and the veil fades full-screen instead. If the component mounts but
  the release signal never arrives, a second keyframe lifts the veil on its own.

  ## Reduced motion is a hard skip

  Not a faster version. The component refuses to render, and the stylesheet
  refuses to animate, so the guard holds whether or not the JavaScript does.
*/
export default function Entrance() {
  const [done, setDone] = useState(false);
  const [go, setGo] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const released = useRef(false);
  const veilRef = useRef<HTMLDivElement>(null);

  const still = useSyncExternalStore(subscribePreference, prefersStill, prefersMotion);
  const sceneReady = useSyncExternalStore(subscribeSceneReady, isSceneReady, () => false);

  const release = useCallback(() => {
    if (released.current) return;
    released.current = true;
    setGo(true);
  }, []);

  useEffect(() => {
    let live = true;
    document.fonts?.ready
      .then(() => {
        if (live) setFontsReady(true);
      })
      .catch(() => {
        if (live) setFontsReady(true);
      });
    return () => {
      live = false;
    };
  }, []);

  /*
    The clock. Polled rather than armed once, because two different things can
    satisfy it — the assets landing early, or the ceiling arriving without them —
    and a single timer would have to know in advance which one it is waiting for.
  */
  useEffect(() => {
    if (still || done || go) return;
    const started = performance.now();
    const assetsReady = sceneReady && fontsReady;
    let timer = 0;
    const tick = () => {
      const elapsed = performance.now() - started;
      if (elapsed >= MAX_HOLD || (elapsed >= MIN_HOLD && assetsReady)) {
        release();
        return;
      }
      timer = window.setTimeout(tick, 60);
    };
    timer = window.setTimeout(tick, MIN_HOLD);
    return () => window.clearTimeout(timer);
  }, [still, done, go, sceneReady, fontsReady, release]);

  /*
    Intent ends the hold. A veil that is covering assets the reader is waiting
    for is fine; a veil that ignores the scroll they just asked for is a page
    that has frozen. The gesture is swallowed while the hold is up, so the
    request starts the reveal instead of moving the page underneath it, and the
    next one scrolls normally.
  */
  useEffect(() => {
    if (still || done || go) return;
    const yieldToIntent = (event: Event) => {
      if (event.type === "keydown" && !NAV_KEYS.includes((event as KeyboardEvent).key)) return;
      if (event.type === "wheel" || event.type === "touchmove") event.preventDefault();
      release();
    };
    window.addEventListener("wheel", yieldToIntent, { passive: false });
    window.addEventListener("touchmove", yieldToIntent, { passive: false });
    window.addEventListener("keydown", yieldToIntent);
    return () => {
      window.removeEventListener("wheel", yieldToIntent);
      window.removeEventListener("touchmove", yieldToIntent);
      window.removeEventListener("keydown", yieldToIntent);
    };
  }, [still, done, go, release]);

  useEffect(() => {
    if (!go) return;
    document.documentElement.classList.add("entrance-go");
  }, [go]);

  useEffect(() => {
    if (!done) return;
    document.documentElement.classList.remove("entrance-go");
  }, [done]);

  /*
    The collapse, written frame by frame rather than as a keyframe, because the
    target moves: the unit leans towards the cursor, so where the screen is at
    the start of the reveal is not where it is at the end of it.

    The clock starts at the first frame that has a rectangle to chase, which
    also covers the gesture that releases the hold before the model has landed —
    there is nothing to collapse into yet, so the collapse begins the moment
    there is. If no rectangle ever arrives, nothing is ever written and the
    stylesheet's full-screen fade plays on its own.

    Nothing clears the inline clip. The overlay unmounts when the opacity
    animation ends, and that is what takes the clip with it — clearing it early
    would flash the full-screen veil back on while it is still partly opaque.
  */
  useEffect(() => {
    if (!go || still) return;
    const veil = veilRef.current;
    if (!veil) return;

    const clipMs = LIFT_MS * CLIP_SHARE;
    let from = 0;
    let started = false;
    let frame = 0;

    const tick = (now: number) => {
      if (screenRect.valid) {
        if (!started) {
          started = true;
          from = now;
        }
        const progress = Math.min(1, (now - from) / clipMs);
        const eased = revealEase(progress);

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const cx = screenRect.x + screenRect.w / 2;
        const cy = screenRect.y + screenRect.h / 2;
        const halfW = (screenRect.w * TARGET_SCALE) / 2;
        const halfH = (screenRect.h * TARGET_SCALE) / 2;
        const left = Math.max(0, cx - halfW);
        const top = Math.max(0, cy - halfH);
        const right = Math.max(0, vw - (cx + halfW));
        const bottom = Math.max(0, vh - (cy + halfH));

        veil.style.clipPath = `inset(${(top * eased).toFixed(1)}px ${(right * eased).toFixed(1)}px ${(bottom * eased).toFixed(1)}px ${(left * eased).toFixed(1)}px)`;

        if (progress >= 1) return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [go, still]);

  if (done || still) return null;

  return (
    <div className="entrance" aria-hidden onAnimationEnd={() => setDone(true)}>
      <div ref={veilRef} className="entrance-veil" />
    </div>
  );
}
