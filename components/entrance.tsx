"use client";

import { useState, useSyncExternalStore } from "react";

/**
 * The site turning on, once, on load.
 *
 * The whole page is a CRT terminal, and the act after this one is a camera flying
 * into that terminal's screen. So the entrance is the moment the machine wakes up:
 * a single bright line in the middle of a dark screen, which opens vertically until
 * the picture is there. One moment, no new copy, and it reads as the step before the
 * scroll rather than as an event of its own.
 *
 * It is deliberately the only entrance the page has, and it earns that by being
 * quiet. The five marquee rows are already drifting before this finishes, so
 * anything that also faded, scaled or staggered in would be a second thing asking
 * for attention during the first second.
 *
 * ## Driven by CSS, not by JS
 *
 * The bars are animated by a stylesheet keyframe, and the keyframe ends with them
 * at zero height. That is a safety property rather than a stylistic one: if
 * hydration fails, or the component never mounts, or a stylesheet is served late,
 * the bars have already collapsed on their own and the page is visible. An entrance
 * that could leave the site permanently behind a black rectangle would be a worse
 * bug than having no entrance at all. The JavaScript here only unmounts an empty
 * div once the animation is done.
 *
 * ## Reduced motion is a hard skip
 *
 * Not a faster version. The marquee already gets the same treatment in
 * `globals.css`: under `prefers-reduced-motion: reduce` this renders nothing at all.
 */
/** Nothing to subscribe to: the preference cannot change mid page view. */
function subscribe() {
  return () => {};
}

function prefersStill() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersMotion() {
  return false;
}

export default function Entrance() {
  const [done, setDone] = useState(false);

  {/*
    Read the preference with `useSyncExternalStore` and an explicit server
    snapshot, the same shape as the clock in the greeting. A `matchMedia` value is
    browser only, exactly like the hour of the day, and `useState` filled in from an
    effect would trip `react-hooks/set-state-in-effect` while doing the same job by
    hand.

    The server says `false`, so the first paint includes the entrance and the
    stylesheet collapses it to zero height under this query anyway. Two guards, and
    the CSS one is the one that holds before any JavaScript exists.
  */}
  const still = useSyncExternalStore(subscribe, prefersStill, prefersMotion);

  if (done || still) return null;

  return (
    <div className="entrance" aria-hidden onAnimationEnd={() => setDone(true)}>
      {/*
        Two bars and a bright edge on each. The edge is what makes it read as a
        screen rather than a wipe: a CRT does not fade in, it scans open, and the
        leading line is the part the eye actually follows. The line is a child of
        the bar so it rides the shrinking edge for free, with no second animation
        to keep in step.

        `onAnimationEnd` is on the wrapper rather than on a bar, and it is not
        bubble-guarded. Both bars finish on the same frame, so the first one to
        report is the one that unmounts everything, and the second never arrives.
      */}
      <div className="entrance-bar entrance-bar-top">
        <span className="entrance-edge" />
      </div>
      <div className="entrance-bar entrance-bar-bottom">
        <span className="entrance-edge" />
      </div>
    </div>
  );
}
