"use client";

import { useEffect, useRef } from "react";
import { PORTAL_INK } from "@/components/terminal-palette";

export type PortalHandle = {
  /** the fill inside the outline track, written as a width percentage */
  fill: HTMLDivElement | null;
};

/**
 * The loading surface, drawn on the black screen the camera has just flown into.
 *
 * One pixel "loading..." plus one outline track with a fill. No panel, no
 * percentage: the reference is a bare loader on black, a box around it would
 * be a second surface on a screen that already is the surface, and a number
 * next to a bar is two indicators for one number.
 *
 * Square corners like everything else here. The reference rounds its track,
 * but this page uses no radius at all, and one rounded box would be the only
 * exception on a screen made of terminals.
 *
 * It reports its node back to the parent instead of running its own scroll logic,
 * because the fill has to be written from a scrubbed tween and latched once it
 * completes. Doing it here would mean a second ScrollTrigger reading the same
 * section, and the two would drift.
 */
export default function PortalLoader({
  onNodes,
  dismissed,
}: {
  onNodes: (handle: PortalHandle) => void;
  dismissed: boolean;
}) {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onNodes({ fill: fill.current });
    // onNodes is stable enough for this: it only assigns refs on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    Gone for good once the load completes. Scrolling back up must never show
    the loader again: completion is a promise, and a loader that returns on
    the way up breaks it. The scrubbed camera still rewinds underneath, so the
    way back is the same smooth path in reverse, just without the interstitial.
    GSAP queried this node once at setup; updating a detached node after this
    unmounts is harmless and touches nothing on screen.
  */
  if (dismissed) return null;

  return (
    <>
      {/*
        Own black fullscreen, not transparent. The panel used to carry the
        loading's background locally; without it the ink text and outline float
        over whatever the camera shows, and the cream marquee leaking past the
        screen edges reads as a cream glitch. #05050a is SCREEN_COLOR, the paint
        of the 3D screen plate the camera just flew into, so the layer and the
        plate are one continuous black.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-[#05050a] opacity-0"
        data-portal
      >
        <div className="flex flex-col items-center px-6">
          <p
            className="font-display pixel-dense display-statement"
            style={{ color: PORTAL_INK }}
          >
            loading...
          </p>

          <div
            className="mt-8 w-[min(560px,72vw)] border-2 p-[3px]"
            style={{ borderColor: PORTAL_INK }}
          >
            <div className="h-[clamp(14px,2.4vh,22px)] w-full">
              <div
                ref={fill}
                className="h-full"
                style={{ width: "0%", background: PORTAL_INK }}
              />
            </div>
          </div>
        </div>
      </div>

      {/*
        Kept out of the visual layer: the fill is meaningless without scroll, so the
        instruction has to name the input, not the action.

        Also kept out of the `aria-hidden` wrapper above, which is the point. An
        `aria-hidden="true"` ancestor hides everything inside it, so this paragraph
        was being hidden along with the bar it describes, and a screen reader was
        told nothing at all about a section that occupies five hundred viewport
        heights. The bar itself is decoration and the instruction carries the
        meaning, so only one of the two is hidden.
      */}
      <p className="sr-only">
        Loading dikendalikan oleh scroll. Lanjutkan menggulir untuk mengisi bilah
        hingga 100 persen, lalu portfolio terbuka.
      </p>
    </>
  );
}
