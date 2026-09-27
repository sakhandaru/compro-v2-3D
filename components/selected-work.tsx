"use client";

import { useState } from "react";
import WorkRow from "@/components/work-row";
import { PROJECTS } from "@/components/projects";

/**
 * DESIGN..md 15.6, as an accordion.
 *
 * The document's own progress diagram is an accordion state machine, one project OPEN
 * and the rest closed, walking 01 to 04. Only the axis is different: the diagram lays
 * the items out in a row, this stacks them. That is a smaller deviation than it looks,
 * and it is the one the content pays for.
 *
 * What changed and why, all of it because the earlier version was taking too much of
 * the reader's scroll away:
 *
 * No sticky, no pinned runway, no ScrollTrigger, no scrub. The section is as tall as
 * its content and the reader sets the pace, which is 11's whole point. A pinned version
 * of this had 716svh of captured scroll and could not be skipped.
 *
 * Opening is a click, not a scroll. Every project title is visible at once, so a
 * reader can see the whole set before committing to any of it, and can jump straight
 * to the eighth. A readout, which is what this replaced, only ever showed one project
 * and lost the reader's place.
 *
 * The rows carry the index, the title and nothing else until opened. Every project
 * uses the same MacBook, so a collapsed row costs nothing by hiding its mockup, and
 * showing eight identical laptops at once would have been the card grid 17 rules out.
 *
 * One row open at a time, because that is what the document's diagram shows.
 */
export default function SelectedWork() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="selected-work"
      aria-labelledby="work-heading"
      className="relative bg-[#f7f6f2] px-5 py-[18vh] sm:px-8 sm:py-[22vh]"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <h2
          id="work-heading"
          className="font-display pixel-dense max-w-[12ch] text-[clamp(2rem,7vw,5.5rem)] leading-[0.9] tracking-[-0.03em] text-zinc-900"
        >
          selected work
        </h2>

        <div className="mt-12 sm:mt-16">
          {PROJECTS.map((project, i) => (
            <WorkRow
              key={project.slug}
              project={project}
              open={openIndex === i}
              onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
