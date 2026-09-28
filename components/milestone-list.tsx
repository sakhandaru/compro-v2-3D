import { timelineContent } from "@/content/timeline";

/**
 * The vertical reading of the journey. Used below the breakpoint where the pinned
 * horizontal timeline is dropped, and for reduced motion.
 *
 * Same data, same order, same words. Nothing is a lesser version of the pinned view,
 * which is the point: DESIGN..md 13 allows mobile to simplify the interaction, and a
 * horizontal drag for a timeline is the wrong gesture on a phone regardless of how
 * good it feels with a mouse.
 */
export default function MilestoneList({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="border-t border-zinc-300">
      {timelineContent.items.map((milestone, i) => (
        <li key={i} className="border-b border-zinc-300">
          <div className={compact ? "py-5" : "py-7 sm:py-9"}>
            <div className="flex items-baseline gap-4 sm:gap-6">
              <p className="font-mono text-[11px] tracking-wide text-zinc-600">
                {milestone.period}
              </p>
              {milestone.role ? (
                <p className="font-mono text-[11px] tracking-wide text-zinc-600">
                  {milestone.role}
                </p>
              ) : null}
            </div>

            <h3 className="font-display pixel-dense mt-3 max-w-[16ch] text-[clamp(1.15rem,2.6vw,1.75rem)] leading-[1] tracking-[-0.02em] text-zinc-900">
              {milestone.title}
            </h3>

            <p className="mt-1.5 font-mono text-[11px] tracking-wide text-zinc-600">
              {milestone.org}
            </p>

            <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-[1.55] text-zinc-700">
              {milestone.line}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
