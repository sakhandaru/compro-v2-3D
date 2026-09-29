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
 * The `prev` / `next` commands and the cells are here because the owner asked
 * for next and slide. They are real buttons, so Tab reaches them and Enter
 * and Space work without any code here, and the position is announced in text
 * rather than only as cell styling, so it survives a screen reader and a
 * browser with the CSS stripped out.
 *
 * Plain words, deliberately: an earlier pass used vim's `:bp` / `:bn`, which
 * is the right vocabulary and the wrong usability, since anyone outside vim
 * cannot parse it. `prev` / `next` in the page's mono voice keeps the theme
 * and stays readable to a lay reader. No box, no chevron, no circle: the word
 * sits bare and underlines like every other text link here.
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
            Bare commands, no box. Resting in zinc-600 (7.15:1, lolos 4.5:1
            untuk teks kecil), hover menggarisbawah seperti semua link teks di
            halaman ini. Kotak 44px dipertahankan untuk target sentuh.
          */}
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={`Previous capture, ${title}`}
            className="absolute top-1/2 -left-1 grid h-11 min-w-11 -translate-y-1/2 cursor-pointer place-items-center px-2 font-mono text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 sm:-left-3"
          >
            <span aria-hidden>prev</span>
          </button>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label={`Next capture, ${title}`}
            className="absolute top-1/2 -right-1 grid h-11 min-w-11 -translate-y-1/2 cursor-pointer place-items-center px-2 font-mono text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 sm:-right-3"
          >
            <span aria-hidden>next</span>
          </button>

          {/*
            The cells were the worst tap targets on the page: `h-1.5 w-1.5` with no
            padding, so the button box was six by six pixels and the gap between two
            of them was eight. On a desktop cursor that is a small dot; under a thumb
            it is a control that cannot be hit, and the eight pixel gap means two
            neighbouring targets sat close enough to read as one.

            So the button is 44 by 44 and the cell is a child centred inside it. The
            row gap goes to zero, because two 44 pixel boxes laid side by side already
            touch exactly, and any gap on top of that would only open a dead strip
            between them.

            Cells rather than dots: the same █/░ language as the portal loader,
            set in the same system mono stack so every cell fills its advance
            width equally. The gallery position reads as a terminal readout, and
            the page gains one repeated motif instead of two competing ones.
          */}
          <div className="mt-6 flex items-center justify-center">
            {screens.map((screen, i) => (
              <button
                key={screen}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show capture ${i + 1} of ${screens.length}`}
                aria-current={i === index}
                className="group/dot grid h-11 w-11 cursor-pointer place-items-center focus-visible:outline-2 focus-visible:outline-zinc-900"
              >
                <span
                  aria-hidden
                  className={`bar-mono block text-base leading-none transition-colors ${
                    i === index
                      ? "text-zinc-900"
                      : "text-zinc-300 group-hover/dot:text-zinc-500"
                  }`}
                >
                  {i === index ? "█" : "░"}
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      <p className="mt-3 text-center font-mono eyebrow tabular-nums text-zinc-600">
        {index + 1} / {screens.length}
      </p>
    </div>
  );
}
