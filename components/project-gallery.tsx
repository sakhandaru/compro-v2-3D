"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

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

  /*
   * The capture follows the finger, then either snaps to the next one or falls
   * back. Two layers are enough for that: the capture on screen, and the one
   * it is travelling towards, parked one full width away. Rendering the whole
   * set as a track would mean twenty five mounted images per project for a
   * gesture that only ever shows two.
   *
   * The offset lives in a ref and is written straight to the two elements'
   * transform during the drag. Putting it in state would re-render the gallery
   * on every pointermove and the capture would lag a frame behind the thumb,
   * which is the exact opposite of following it. React state is only told the
   * index after the travel is over.
   *
   * `touch-action: pan-y` is the load-bearing part of the gesture. It leaves
   * vertical scrolling to the browser while horizontal movement belongs to us,
   * so a thumb that lands on a capture and drags upward still scrolls the page
   * instead of being swallowed as a swipe that goes nowhere. When the browser
   * does claim the gesture for a scroll it fires pointercancel, and the
   * capture is put back rather than committed.
   *
   * A drag only counts when it is more horizontal than vertical, and only past
   * 40px, so a tap that wobbles and a scroll that drifts sideways a little
   * both land as no gesture at all.
   *
   * The images are marked `draggable={false}` for the same reason the capture
   * is captured. An image is natively draggable, and the browser starts that
   * drag the moment a pointer moves while held, which fires pointercancel and
   * ends the gesture before it can finish. It reads as the swipe simply
   * refusing to work, and on a touch screen it is a long press away.
   */
  const [dir, setDir] = useState(1);
  const [travelling, setTravelling] = useState(false);
  const base = useRef<HTMLDivElement>(null);
  const incoming = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const width = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";
  const still = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const place = (node: HTMLDivElement | null, x: number, ms: number) => {
    if (!node) return;
    node.style.transition = ms ? `transform ${ms}ms ${EASE}` : "none";
    node.style.transform = `translate3d(${x}px, 0, 0)`;
  };

  /*
   * Finish the travel to `next`. Both layers are pushed to their end position
   * at once, the index is committed, then the layers are snapped back to
   * neutral with transitions off. The commit happens on a timer rather than
   * on transitionend, because a layer that is display:none or off screen can
   * skip the event and leave the gallery stranded mid slide.
   */
  const land = (next: number, from: number, travel: number) => {
    if (timer.current) clearTimeout(timer.current);

    if (still()) {
      setDir(next > from ? 1 : -1);
      setTravelling(false);
      setIndex(next);
      return;
    }

    const ms = 260;
    setTravelling(true);
    setDir(next > from ? 1 : -1);
    place(base.current, travel, ms);
    place(incoming.current, travel + (next > from ? -width.current : width.current), ms);

    timer.current = setTimeout(() => {
      place(base.current, 0, 0);
      place(incoming.current, 0, 0);
      setTravelling(false);
      setIndex(next);
    }, ms);
  };

  const step = (delta: number) => {
    if (!many) return;
    const from = index;
    const next = (from + delta + screens.length) % screens.length;
    setDir(delta > 0 ? 1 : -1);
    setTravelling(true);
    land(next, from, delta > 0 ? -width.current : width.current);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!many || (event.pointerType === "mouse" && event.button !== 0)) return;
    width.current = event.currentTarget.getBoundingClientRect().width;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    /*
      Capture, because a flick travels further than the capture is wide: the
      gallery is 350px and a 200px flick starting from the middle ends up
      outside it. Without capture the release lands on whatever is next in the
      page, the gallery never hears that the gesture ended, and the capture is
      left stranded half way across with the neighbour still mounted. Capturing
      retargets every later event for this pointer back here, wherever the
      finger actually is.
    */
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start || start.id !== event.pointerId || !width.current) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) <= Math.abs(dy)) return;

    if (!travelling) {
      setDir(dx < 0 ? 1 : -1);
      setTravelling(true);
    }
    place(base.current, dx, 0);
    place(incoming.current, dx + (dx < 0 ? width.current : -width.current), 0);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) {
      if (travelling) land(index, index, 0);
      return;
    }
    const next = (index + (dx < 0 ? 1 : -1) + screens.length) % screens.length;
    land(next, index, dx);
  };

  const onPointerCancel = () => {
    drag.current = null;
    if (travelling) land(index, index, 0);
  };

  const shown = screens[index]!;
  const next = screens[(index + dir + screens.length) % screens.length]!;

  return (
    <div className="relative">
      <div
        role="group"
        aria-label={`${title}, screen captures`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerCancel={onPointerCancel}
        className="relative flex h-[clamp(17rem,38vw,27rem)] touch-pan-y items-center justify-center overflow-hidden select-none"
      >
        <div ref={base} className="flex h-full w-full items-center justify-center">
          <Image
            key={shown}
            src={shown}
            alt={`${title}, capture ${index + 1} of ${screens.length}`}
            width={1800}
            height={1412}
            sizes="(min-width: 1024px) 40vw, 92vw"
            priority={false}
            draggable={false}
            className="max-h-full w-auto max-w-full object-contain"
          />
        </div>

        {/*
          The neighbour, parked one full width to the side. It is mounted only
          while the gallery is travelling, so the resting page still costs one
          image per project. `aria-hidden` because the readout below already
          names the position, and a screen reader should not meet two captures
          where the control reports one.
        */}
        {travelling ? (
          <div
            ref={incoming}
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              key={next}
              src={next}
              alt=""
              width={1800}
              height={1412}
              sizes="(min-width: 1024px) 40vw, 92vw"
              priority={false}
              draggable={false}
              className="max-h-full w-auto max-w-full object-contain"
            />
          </div>
        ) : null}
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
