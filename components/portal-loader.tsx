"use client";

import { useEffect, useRef } from "react";
import { PORTAL_INK, RASTER_FILL, SCANLINE } from "@/components/terminal-palette";

export type PortalHandle = {
  /** the raster div, scaled by the fill */
  raster: HTMLDivElement | null;
  /** the scanline, translated to the raster's leading edge */
  scanline: HTMLDivElement | null;
  /** the numeric readout */
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
  const raster = useRef<HTMLDivElement>(null);
  const scanline = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onNodes({
      raster: raster.current,
      scanline: scanline.current,
      readout: readout.current,
    });
    // onNodes is stable enough for this: it only assigns refs on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 opacity-0"
      data-portal
    >
      <div
        ref={raster}
        className="absolute inset-x-0 top-0 h-full origin-top"
        style={{ background: RASTER_FILL, transform: "scaleY(0)" }}
      />

      {/*
        The scanline is a sibling rather than a child of the raster: the raster is
        scaled, so a child would be scaled with it and the line would stretch.
      */}
      <div
        ref={scanline}
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: SCANLINE, opacity: 0.85 }}
      />

      <div className="absolute inset-0 grid place-items-center">
        <div
          ref={readout}
          className="font-display pixel-dense text-[clamp(2.5rem,9vw,7rem)] leading-none tracking-[-0.02em]"
          style={{ color: PORTAL_INK }}
        >
          000
        </div>
      </div>

      {/*
        Kept out of the visual layer: the fill is meaningless without scroll, so the
        instruction has to name the input, not the action.
      */}
      <p className="sr-only">
        Loading dikendalikan oleh scroll. Lanjutkan menggulir untuk mengisi layar,
        lalu portfolio terbuka.
      </p>
    </div>
  );
}
