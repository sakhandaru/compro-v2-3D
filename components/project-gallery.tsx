"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * The device captures, one at a time, with the owner's own mockups.
 *
 * These are finished device shots on a transparent background, not raw screenshots.
 * Every one of the twenty five is a MacBook already holding its own website, so
 * nothing is composited here: the file is placed as it is and the page shows
 * through where the artwork is empty. An earlier version drew a MacBook frame and
 * pushed the capture through a transparent screen area in it, which is the right
 * idea for a screenshot and the wrong one for a file that already has a laptop in
 * it, so the laptop ended up inside a laptop.
 *
 * The box is a fixed height and the image is contained inside it, because the
 * captures are not all the same shape. Twenty two are 1800 by 1412, two are square,
 * and one is a tall laptop and phone pair at 883 by 1800. Letting each one size
 * itself would make the row jump every time the arrow is pressed.
 *
 * The arrows and the dots are here because the owner asked for next and slide. They
 * are real buttons, so Tab reaches them and Enter and Space work without any code
 * here, and the position is announced in text rather than only as dot styling, so
 * it survives a screen reader and a browser with the CSS stripped out.
 *
 * The chevrons are drawn here rather than pulled from an icon package. A previous
 * or next chevron is a control glyph, not a brand, and importing a set for two
 * arrows would drag its whole visual character along with them.
 */
export default function ProjectGallery({
  screens,
  title,
}: {
  screens: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const many = screens.length > 1;

  const step = (delta: number) => {
    setIndex((current) => (current + delta + screens.length) % screens.length);
  };

  return (
    <div className="relative">
      <div
        role="group"
        aria-label={`${title}, screen captures`}
        className="flex h-[clamp(17rem,38vw,27rem)] items-center justify-center"
      >
        <Image
          key={screens[index]}
          src={screens[index]!}
          alt={`${title}, capture ${index + 1} of ${screens.length}`}
          width={1800}
          height={1412}
          sizes="(min-width: 1024px) 40vw, 92vw"
          priority={false}
          className="max-h-full w-auto max-w-full object-contain"
        />
      </div>

      {many ? (
        <>
          {/*
            The shadow is not decoration here. These buttons sit directly on the same
            cream as the artwork, and a white circle on cream with no edge would be
            invisible until you found it, so the lift is what makes the control
            findable. It is the one place on this page a shadow earns its place.
          */}
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={`Previous capture, ${title}`}
            className="absolute top-1/2 -left-1 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-zinc-900 shadow-[0_2px_10px_rgba(24,24,27,0.14)] transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 sm:-left-3"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="none">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="square"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label={`Next capture, ${title}`}
            className="absolute top-1/2 -right-1 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-zinc-900 shadow-[0_2px_10px_rgba(24,24,27,0.14)] transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 sm:-right-3"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="none">
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="square"
              />
            </svg>
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {screens.map((screen, i) => (
              <button
                key={screen}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show capture ${i + 1} of ${screens.length}`}
                aria-current={i === index}
                className={`h-1.5 cursor-pointer rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                  i === index ? "w-6 bg-zinc-900" : "w-1.5 bg-zinc-300 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}

      <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
        {index + 1} / {screens.length}
      </p>
    </div>
  );
}
