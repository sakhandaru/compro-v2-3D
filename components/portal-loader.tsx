"use client";

import { useEffect, useRef } from "react";
import { BAR_CELLS, PORTAL_READOUT_INK } from "@/components/terminal-palette";

export type PortalHandle = {
  /** the bar, written as block characters */
  bar: HTMLDivElement | null;
  /** the percentage under the bar */
  readout: HTMLDivElement | null;
};

/**
 * The loading surface, drawn on the black screen the camera has just flown into.
 *
 * It reports its nodes back to the parent instead of running its own scroll logic,
 * because the fill has to be written from a scrubbed tween and latched once it
 * completes. Doing it here would mean a second ScrollTrigger reading the same
 * section, and the two would drift.
 */
export default function PortalLoader({ onNodes }: { onNodes: (handle: PortalHandle) => void }) {
  const bar = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onNodes({ bar: bar.current, readout: readout.current });
    // onNodes is stable enough for this: it only assigns refs on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 grid place-items-center opacity-0"
        data-portal
      >
        {/*
          The bar in a box, and the box is doing two jobs.

          It is the frame the owner asked for, and it is also the only thing carrying
          the loading's surface. That used to be a full screen raster sweeping down
          behind the text, and it was removed: once an explicit bar existed, a second
          element growing with the same value was a second progress indicator for one
          number. It was also the thing that cut the readout in half, since the raster
          edge and the scanline both sit at `value` of the viewport height and a block
          parked in the middle is sliced by them at exactly 50%.

          With the box carrying its own background, the panel no longer depends on
          what is behind it. That matters because behind it is a WebGL scene, and if
          that scene fails to render, a light bar on cream would have been unreadable.

          Flat and square, like everything else here. The page uses no radius at all,
          and a rounded panel here would be the one exception on a screen made of
          terminals.
        */}
        <div className="portal-panel -translate-y-[6vh] px-7 py-6 sm:px-9 sm:py-7">
          <div
            ref={bar}
            className="bar-mono text-[clamp(0.9375rem,3.6vw,2.25rem)] leading-none whitespace-nowrap"
          >
            {"█".repeat(BAR_CELLS)}
          </div>

          {/*
            Left aligned under the bar, not right aligned. A bar that starts at the
            left edge with its number pushed to the right edge reads as two things
            competing; a terminal prints both from the same cursor.
          */}
          <div
            ref={readout}
            className="bar-mono mt-4 text-[clamp(0.8125rem,2.6vw,1.375rem)] leading-none"
            style={{ color: PORTAL_READOUT_INK }}
          >
            0%
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
