"use client";

import { useSyncExternalStore } from "react";

import { heroContent } from "@/content/hero";

/**
 * The opening line of HERO 2, decided by the clock.
 *
 * This is the owner's own greeting rather than a headline, and it is placed here
 * because a photograph alone does not give the section a job. A greeting makes the
 * picture address whoever opened the page, which is the only line on this site that
 * can do that.
 *
 * The "sir" is deliberate. A good morning, sir is not how anyone in English greets
 * another person, and that is the point: the site is built in a formal, instrumental
 * register (ruler, ticks, a readout, a counter), and a formal vocative is the one
 * greeting in that register. Asked whether it was a slip, the owner confirmed it was
 * on purpose. It stays exactly as written.
 *
 * ## Why it is a client component and not a `new Date()` in the server
 *
 * HERO 2 is a Server Component, and a server clock is the wrong clock twice over.
 * The host can sit in any timezone, so a visitor in Semarang opening the page at
 * eight in the morning could be served "good evening" from a server on UTC. And the
 * moment the client hydrated with its own answer, the text would differ from the
 * markup React already handed it, which is a hydration mismatch and an error in the
 * console rather than a cosmetic problem.
 *
 * So the first paint carries the reserved box and no words, and the greeting is
 * filled in from the visitor's own clock after mount. That is also the honest
 * reading of the idea: the gesture is towards whoever is looking, so their clock
 * decides, not the machine's.
 *
 * ## The deterministic exception
 *
 * The ruler ticks and the hero marquee are both fixed sine hashes precisely so the
 * page looks identical on every load and a screenshot stays comparable. This is a
 * deliberate exception to that, and it is a small one: the text changes four times a
 * day, not every frame, so nothing shimmers on refresh. What it buys is that a
 * visitor who comes back tomorrow sees something different, which is the one reward
 * a static page cannot otherwise give.
 */

/**
 * Which greeting an hour of the day gets.
 *
 * The list comes from `content/hero.ts`, and the buckets are assumed to be in
 * ascending order of `from`. Rather than sort on every call for a five element
 * array that only runs once per page load, the loop simply keeps the last bucket
 * whose start is at or before the hour, which is the same answer and reads
 * straight. A bucket that is not ordered correctly shows up immediately as the
 * wrong greeting at a particular hour, so nothing is hidden by the simplification.
 */
/**
 * Which greeting an hour of the day gets.
 *
 * The buckets are assumed to be in ascending order of `from`, and the last one is
 * seeded as the starting value rather than the first. That is what makes the list
 * wrap past midnight: at two in the morning no bucket has started yet, so the
 * answer stays on the last bucket, which is the night one. Seeding from the first
 * entry instead reads correctly for every hour from four onwards and silently
 * returns "good morning" for the small hours, which is the one hour range a visitor
 * is most likely to be reading alone.
 *
 * Nothing is sorted on the way. A five element array runs once per page load, and a
 * bucket that is out of order shows up immediately as the wrong greeting at a
 * particular hour, so the simplification hides nothing.
 */
function greetingFor(hour: number) {
  let text: string = heroContent.greeting[heroContent.greeting.length - 1]!.text;
  for (const greeting of heroContent.greeting) {
    if (hour >= greeting.from) text = greeting.text;
  }
  return text;
}

/**
 * Nothing to subscribe to. The clock is read once, when the page opens, and a
 * greeting that changed under a reader who is halfway through the sentence would be
 * worse than one that is four hours stale.
 */
function subscribe() {
  return () => {};
}

function clientGreeting() {
  return greetingFor(new Date().getHours());
}

function serverGreeting() {
  return null;
}

export default function HeroGreeting() {
  {/*
    `useSyncExternalStore` with an explicit server snapshot, rather than a
    `useState` filled in from an effect.

    The first is the API built for exactly this case: a value that genuinely does
    not exist on the server. It renders `null` for the server pass and for the
    hydration pass, so React compares like with like, and then reads the real clock
    and re-renders once. A `useState` plus `useEffect` does the same thing by hand and
    trips `react-hooks/set-state-in-effect` on the way, and calling `new Date()`
    during render instead would hydrate a different string than the server sent, which
    is the mismatch this file exists to avoid.
  */}
  const greeting = useSyncExternalStore(subscribe, clientGreeting, serverGreeting);

  {/*
    The greeting sits in the top right corner, opposite WELCOME in the bottom left,
    so the two of them bracket the photograph instead of stacking on top of each
    other. It is a `<p>` and not a heading because WELCOME is the section's heading
    now: the greeting changes four times a day, and a sentence that changes is a
    detail, not the thing the section is about.

    It is positioned by its parent rather than laid out in flow, which is what makes
    it free. The four variants are between fourteen and nineteen characters, so at
    this size some wrap to a second line and some do not. In flow that would resize
    the box and nudge the section; out of flow it cannot affect anything, and WELCOME
    never moves.
  */}
  return (
    <p
      id="hero-greeting"
      className="font-display pixel-dense max-w-[22ch] text-right text-[clamp(0.9375rem,2.2vw,1.5rem)] leading-[1.15] text-[#f2efe7]"
    >
      {greeting}
    </p>
  );
}
