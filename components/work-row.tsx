"use client";

import { useId } from "react";
import ProjectGallery from "@/components/project-gallery";
import { projectsContent, type Project } from "@/content/projects";

/**
 * One row of the accordion, and the whole interaction model of 15.6 in one component.
 *
 * The row itself always shows the index and the title, so a reader scrolling past sees
 * all eight titles at once. That is the part a readout cannot do: a readout only ever
 * shows one project, which is exactly the orientation loss 11 warns about. Opening a
 * row is a click, not a scroll, so the reader chooses what to look at instead of being
 * walked through it.
 *
 * Height is animated with grid-template-rows from 0fr to 1fr rather than a measured
 * pixel height. Nothing here has to know how tall the content is, which is why there
 * is no magic max-height and nothing to keep in sync when a project's blurb or mockup
 * changes length. The inner overflow-hidden child is what makes the row collapse.
 */
export default function WorkRow({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();

  return (
    <div className="border-t border-zinc-300 last:border-b">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full cursor-pointer items-baseline gap-4 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zinc-900 sm:gap-8 sm:py-8"
        >
          {/*
            No index in front of the title. The numbers were there to let a reader scan
            the column and count, and the owner called them distracting, which is
            right: a two digit figure in mono next to a pixel face at this size reads
            as a price tag or a table row number, and the order of the rows is already
            obvious from the reading order. The data still carries `index`, so putting
            it back is one element.
          */}
          <span
            className={`font-display pixel-dense flex-1 text-[clamp(1.35rem,3.6vw,2.75rem)] leading-[0.95] tracking-[-0.02em] transition-colors ${open ? "text-zinc-900" : "text-zinc-800"}`}
          >
            {project.title}
          </span>

          <span
            className={`font-mono text-[11px] tracking-wide transition-all duration-300 ${open ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-900"}`}
          >
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-label={project.title}
        data-open={open}
        className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-8 pb-12 sm:pb-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-start md:gap-10 lg:gap-12">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 font-mono text-[11px] tracking-wide text-zinc-600">
                <span>{project.year}</span>
                <span>{project.role}</span>
                {/*
                  The owner's `tag`, kept as its own line rather than folded into the
                  blurb. Seven of these shipped and two are still concepts, and saying
                  which is the most useful thing on the row. A visitor reading "concept"
                  judges the entry differently from one reading "completed", and hiding
                  that behind a paragraph would be a small lie of omission.
                */}
                <span
                  className={
                    project.status === "Completed"
                      ? "text-zinc-900"
                      : "border border-zinc-300 px-2 py-0.5 text-zinc-600"
                  }
                >
                  {project.status}
                </span>
              </div>

              <p className="mt-5 max-w-[34ch] text-[clamp(0.95rem,1.1vw,1.0625rem)] leading-[1.5] text-zinc-700">
                {project.blurb}
              </p>

              {/*
                Tech as names. Nine of the sixteen technologies named across the
                portfolio have no icon in the owner's icon folder, and six of those are
                not brands but generic terms, so an icon for them would have to be
                invented. The real brand marks are used on the skills list in About.
              */}
              <p className="mt-6 font-mono text-[11px] leading-[1.9] tracking-wide text-zinc-600">
                {project.tech.join(" · ")}
              </p>

              {/*
                Only real destinations reach this. Eleven of the fifteen links in the
                owner's data are the string "#", and those were dropped in the data
                rather than here, so there is nothing to disable and no control on the
                page that goes nowhere.
              */}
              {project.links.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-block py-[0.875rem] font-mono text-[11px] uppercase tracking-wide text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900 focus-visible:decoration-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
                      >
                        {projectsContent.linkLabels[link.kind]}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <ProjectGallery screens={project.screens} title={project.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
